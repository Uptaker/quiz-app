import {config} from '../config'
import type {Request, Response} from 'express'

export class AdminRoute {

  private static reject(res: Response) {
    res.setHeader('www-authenticate', 'Basic')
    res.sendStatus(401)
  }

  static login(req: Request, res: Response) {
    const authorization = req.headers.authorization
    if (!authorization) return this.reject(res)
    const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64')
      .toString().split(':')

    if (username !== config.ADMIN_USER && password !== config.ADMIN_PASSWORD) {
      return this.reject(res)
    }

    res.send('Soon')
  }
}