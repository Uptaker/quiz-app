import type {Request, Response} from 'express'
import multer from 'multer'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import type {QuizInfo, QuizQuestion} from '../types'
import {log} from '../utils/Logger'
import {SheetsService} from '../services/SheetsService'

export class QuizRoute {
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