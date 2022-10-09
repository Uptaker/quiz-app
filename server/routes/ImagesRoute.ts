import multer from 'multer'
import type {Request, Response} from 'express'
import fs from 'fs'
import path from 'path'
import {log} from '../utils/Logger'

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
