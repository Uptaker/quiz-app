import {config} from '../config'
import type {Request, Response} from 'express'
import type {UserAuth} from '../types'
import {log} from '../utils/Logger'
import {session} from '../server'

export class AdminRoute {

  private static reject(res: Response) {
    res.sendStatus(401)
  }

  public static routeGuard(req: Request, res: Response, next: Function){
    if (req.session.id != session) return res.sendStatus(401)
    next();
  }

  static login(req: Request, res: Response, callback: Function) {
    try {
      const auth = req.body as UserAuth
      if (auth?.username !== config.ADMIN_USER || auth?.password !== config.ADMIN_PASSWORD) {
        return this.reject(res)
      }
      callback()
      res.sendStatus(202)
    } catch (e) {
      log.error('caught error: ' + e)
      this.reject(res)
    }
  }

  static logout(req: Request, res: Response) {
    req.session.destroy(() => { log.info('User logged out') })
    res.redirect('/')
  }

  static check(req: Request, res: Response) {
    if (req.session.id == session) return res.sendStatus(202)
    else return res.sendStatus(401)
  }
}