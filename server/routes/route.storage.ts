import type {Request, Response} from 'express'
import multer from 'multer'
import crypto from 'crypto'
import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'

export class StorageRoute {
  private static storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      const filePath = './storage/' + (req.params['uuid'] ?? crypto.randomUUID()) + '/'
      fs.mkdirSync(filePath , {recursive: true})
      cb(null, filePath)
    },
    filename: (req: Request, file, cb) => cb(null, 'source' + path.extname(file.originalname))
  })
  public static upload = multer({storage: this.storage})

  public static readJson(uuid: string) {
    fs.readFileSync(`./storage/${uuid}/data.json`)
  }

  // TODO clean up old existing source file before overwriting/adding new
  private cleanupSource(uuid: string) {
    const files = fs.readdirSync('./storage/' + uuid)
    for (const file of files) {
      if (file.startsWith('source')) fs.unlink(`./storage/${uuid}/${file}`, err => {
        // if (err) throw err(`Could not delete file ${file}`)
        console.log(`File ${file} of ${uuid}was deleted`)
      })
    }
  }

  static store(req: Request, res: Response) {
    console.log(req.files)
    if (req.files?.length) {
      // @ts-ignore
      for (const file of req.files) SheetsService.read(file)
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
  public static read(file: { destination: string; filename: string }) {
    const uuid = file.destination.split('/')[2]
    console.log('uuid', uuid)
    const extension = file.filename.split('.').pop()
    console.log('type', extension)
    const spreadsheet = xlsx.readFile(`./storage/${uuid}/source.${extension}`)
    const names = spreadsheet.SheetNames
    let json = xlsx.utils.sheet_to_json(spreadsheet.Sheets[names[0]])
    console.log(json)
    // fs.readFileSync(path + 'data.json')
    this.write(uuid, JSON.stringify(json))
  }

  public static write(uuid: string, jsonStringified: string) {
    fs.writeFileSync(`./storage/${uuid}/data.json`, jsonStringified)
  }
}