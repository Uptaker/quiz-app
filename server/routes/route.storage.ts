import type {Request, Response} from 'express'
import multer from 'multer'
import crypto from 'crypto'

export class StorageRoute {
  private static storage = multer.diskStorage({
    destination: (req: Request, file, cb) => cb(null, './storage'),
    filename: (req: Request, file, cb) => cb(null, crypto.randomUUID() + '--' + file.originalname)
  })
  public static upload = multer({storage: this.storage})

  static store(req: Request, res: Response) {
    console.log(req.files)
    res.status(200).send('Sending multiple files success!')
  }
}