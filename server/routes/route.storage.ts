import type {Request, Response} from 'express'
import multer from 'multer'
import crypto from 'crypto'
import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'
import type {QuizInfo, QuizQuestion} from '../types'

enum QuizSheetColumn {
  QUESTIONS = 'KÜSIMUSED', ANSWERS = 'VASTUSED', PICTURE = 'PILT'
}

export class StorageRoute {
  private static storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      const filePath = './storage/' + (req.params['uuid'] ?? crypto.randomUUID()) + '/'
      fs.mkdirSync(filePath , {recursive: true})
      cb(null, filePath)
    },
    filename: (req: Request, file, cb) => cb(null, 'source' + path.extname(file.originalname)),

  })
  public static upload = multer({storage: this.storage})

  public static readQuiz(req: Request, res: Response) {
    const uuid = req.params['uuid']
    if (!uuid) return res.status(400).send('Vale UUID')
    try {
      const questions: QuizQuestion[] = JSON.parse(fs.readFileSync(`./storage/${uuid}/data.json`, 'utf-8'))
      const info: QuizInfo = (JSON.parse(fs.readFileSync(`./storage/quizlist.json`, 'utf-8')) as QuizInfo[]).find(q => q.uuid === uuid)!
      res.status(200).send({questions: questions, info: info})
    } catch (e) {
      console.log(e)
      res.status(400).send('Sellist testi pole olemas')
    }
  }

  public static deleteQuiz(req: Request, res: Response) {
    const uuid = req.params['uuid']
    if (!uuid) return res.status(400).send('Vale UUID')
    try {
      this.removeInQuizList(uuid)
      this.deleteQuizDirectory(uuid)
      res.status(200).send()
    } catch (e) {
      console.log(e)
      res.status(400).send('Sellist testi pole olemas')
    }
  }

  public static deleteQuizDirectory(id: string) {
    fs.rmSync(`./storage/${id}/`, { recursive: true, force: true })
  }

  public static readQuizList(req: Request, res: Response) {
    let list: QuizInfo[] = []
    try {
      list = JSON.parse(fs.readFileSync(`./storage/quizlist.json`, 'utf-8'))
    } catch (e) {
      console.log(e)
    } finally {
      res.status(200).send(list)
    }
  }

  public static updateQuizList(...newQuizInfo: QuizInfo[]) {
    let list: QuizInfo[] = []
    try {
      list = JSON.parse(fs.readFileSync(`./storage/quizlist.json`, 'utf-8'))
    } catch (e) {
      list = []
    } finally {
      this.writeQuizList(...list.concat(newQuizInfo))
    }
  }

  private static writeQuizList(...quizInfo: QuizInfo[]) {
    fs.writeFileSync(`./storage/quizlist.json`, JSON.stringify(quizInfo))
  }

  public static removeInQuizList(uuid: string) {
    const list: QuizInfo[] = JSON.parse(fs.readFileSync(`./storage/quizlist.json`, 'utf-8'))
    const newList = list.filter(quiz => quiz.uuid !== uuid)
    this.writeQuizList(...newList)
  }

  // TODO - clean up old existing source file before overwriting/adding new
  private cleanupSource(uuid: string) {
    const files = fs.readdirSync('./storage/' + uuid)
    for (const file of files) {
      if (file.startsWith('source')) fs.unlink(`./storage/${uuid}/${file}`, err => {
        // if (err) throw err(`Could not delete file ${file}`)
        console.log(`Fail ${file} of ${uuid} was deleted`)
      })
    }
  }

  static store(req: Request, res: Response) {
    if (req.files?.length) {
      // @ts-ignore
      for (const file of req.files) {
        try {
          SheetsService.read(file)
        } catch (e) {
          res.status(422).send('Tõrge töötlemisel ' + file.filename)
        }
      }
      res.status(200).send('Sending multiple files success!')
    } else {
      res.status(422).send('Could not process request - upload failed')
    }
  }

  static update(req: Request, res: Response) {
    if (req.file) {
      res.status(200).send('Sending multiple files success!')
    } else {
      res.status(422).send('Could not process request - upload failed')
    }
  }
}

export class SheetsService {
  public static read(file: { destination: string; filename: string; originalname: string }) {
    const uuid = file.destination.split('/')[2]
    const extension = file.filename.split('.').pop()
    const spreadsheet = xlsx.readFile(`./storage/${uuid}/source.${extension}`)
    const names = spreadsheet.SheetNames
    let json: QuizQuestion[] | any[] = xlsx.utils.sheet_to_json(spreadsheet.Sheets[names[0]])
    json.forEach(j => {
      j.question = j[QuizSheetColumn.QUESTIONS]
      delete j[QuizSheetColumn.QUESTIONS]
      j.answer = j[QuizSheetColumn.ANSWERS]?.toString()
      delete j[QuizSheetColumn.ANSWERS]
      if (j[QuizSheetColumn.PICTURE]) {
        j.pictureName = j[QuizSheetColumn.PICTURE]
        delete j[QuizSheetColumn.PICTURE]
      }
    });
    this.write(uuid, JSON.stringify(json))

    const name = file.originalname.slice(0, file.originalname.lastIndexOf('.'))
      .replaceAll('-', ' ').replaceAll('_', ' ')
    StorageRoute.updateQuizList({name, uuid, createdAt: Date.now().toString()} as QuizInfo)
  }

  public static write(uuid: string, jsonStringified: string) {
    fs.writeFileSync(`./storage/${uuid}/data.json`, jsonStringified)
  }
}