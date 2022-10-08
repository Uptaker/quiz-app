import type {Request, Response} from 'express'
import multer from 'multer'
import crypto from 'crypto'
import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'
import type {QuizInfo, QuizQuestion} from '../types'
import {log} from '../Logger'

enum QuizSheetColumn {
  QUESTIONS = 'KÜSIMUSED', ANSWERS = 'VASTUSED', PICTURE = 'PILT', PICTURES = 'PILDID'
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

  public static read(req: Request, res: Response) {
    const uuid = req.params['uuid']
    if (!uuid) return res.status(400).send('Vale UUID')
    try {
      const questions: QuizQuestion[] = JSON.parse(fs.readFileSync(`./storage/${uuid}/data.json`, 'utf-8'))
      const info: QuizInfo = (JSON.parse(fs.readFileSync(`./storage/quizlist.json`, 'utf-8')) as QuizInfo[]).find(q => q.uuid === uuid)!
      res.status(200).send({questions: questions, info: info})
    } catch (e) {
      log.error(`${e}`)
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
      log.error(`${e}`)
      res.status(400).send('Sellist testi pole olemas')
    }
  }

  public static deleteQuizDirectory(id: string) {
    fs.rmSync(`./storage/${id}/`, { recursive: true, force: true })
  }

  public static readList(req: Request, res: Response) {
    let list: QuizInfo[] = []
    try {
      list = JSON.parse(fs.readFileSync(`./storage/quizlist.json`, 'utf-8'))
    } catch (e) {
      log.error(`${e}`)
    } finally {
      res.status(200).send(list)
    }
  }

  public static addToList(...newQuizInfo: QuizInfo[]) {
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
    if (!fs.existsSync('./storage/')) fs.mkdirSync('./storage/', {recursive: true})
    fs.writeFileSync(`./storage/quizlist.json`, JSON.stringify(quizInfo))
  }

  public static removeInQuizList(uuid: string) {
    const list: QuizInfo[] = JSON.parse(fs.readFileSync(`./storage/quizlist.json`, 'utf-8'))
    const newList = list.filter(quiz => quiz.uuid !== uuid)
    this.writeQuizList(...newList)
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
    const uuid = req.params['uuid']
    const body: QuizInfo = req.body
    if (!body?.uuid || !body?.name) return res.sendStatus(400).send('Vale UUID')
    if (!uuid || uuid !== body?.uuid) return res.sendStatus(400).send('Vale UUID')
    try {
      this.removeInQuizList(uuid)
      this.addToList({...body, updatedAt: Date.now()})
      res.sendStatus(200)
    } catch (e) {
      log.error(`${e}`)
      res.sendStatus(400).send('No such test')
    }
  }
}













export class ImagesRoute {
  private static storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      const filePath = './storage/img/'
      fs.mkdirSync(filePath , {recursive: true})
      cb(null, filePath)
    },
    filename: (req: Request, file, cb) => cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8',).toLowerCase()),

  })
  public static upload = multer({storage: this.storage})

  public static read(req: Request, res: Response) {
    const imageName = req.params['name']?.toLowerCase()
    if (!imageName) return res.status(400).send('Invalid request')
    try {
      res.header("Content-Type", "image/jpeg");
      res.status(200).sendFile(path.join('/app/storage/img/' + imageName), (err) => {
          if (err) {
            log.error(`${err}`)
            res.status(404).send("Not found")
          }
        })
    } catch (e) {
      log.error(`${e}`)
      res.status(404).send('No such image')
    }
  }

  public static delete(req: Request, res: Response) {
    const name = req.params['name']?.toLowerCase()
    if (!name) return res.status(400).send('Invalid request')
    try {
      this.deleteFromList(name)
      this.deleteImage(name)
      res.status(200).send()
    } catch (e) {
      log.error(`${e}`)
      res.status(400).send('No such image')
    }
  }

  public static deleteImage(name: string) {
    fs.rmSync(`./storage/img/${name}`, { force: true })
  }

  public static readList(req: Request, res: Response) {
    let list: string[] = []
    try {
      list = JSON.parse(fs.readFileSync(`./storage/imagelist.json`, 'utf-8'))
    } catch (e) {
      log.error(`${e}`)
    } finally {
      res.status(200).send(list)
    }
  }

  public static deleteFromList(imageFile: string) {
    let list: string[] = []
    try {
      list = JSON.parse(fs.readFileSync(`./storage/imagelist.json`, 'utf-8'))
    } catch (e) {
      list = []
    } finally {
      // @ts-ignore
      this.writeList(list.filter(image => image !== imageFile))
    }
  }

  public static addToList(listToAdd: string[]) {
    let list: string[] = []
    try {
      list = JSON.parse(fs.readFileSync(`./storage/imagelist.json`, 'utf-8'))
    } catch (e) {
      list = []
    } finally {
      this.writeList(list.concat(listToAdd))
    }
  }

  private static writeList(fileNames: string[]) {
    fs.writeFileSync(`./storage/imagelist.json`, JSON.stringify([...new Set(fileNames)]))
  }

  static store(req: Request, res: Response) {
    if (req.files?.length) {
      // @ts-ignore
      this.addToList(req.files.map(f => f.filename))
      res.status(200).send('Stored images successfully')
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
      } else if (j[QuizSheetColumn.PICTURES]) {
        j.pictureName = j[QuizSheetColumn.PICTURES]
        delete j[QuizSheetColumn.PICTURES]
      }
    });
    this.write(uuid, JSON.stringify(json))

    const utf8name = Buffer.from(file.originalname, 'latin1').toString('utf8')
    const name = utf8name.slice(0, utf8name.lastIndexOf('.'))
      .replaceAll('-', ' ').replaceAll('_', ' ').trim()
    StorageRoute.addToList({name, uuid, createdAt: Date.now()} as QuizInfo)
  }

  public static write(uuid: string, jsonStringified: string) {
    fs.writeFileSync(`./storage/${uuid}/data.json`, jsonStringified)
  }
}