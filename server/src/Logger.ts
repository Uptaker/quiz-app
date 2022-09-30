import {Request} from 'express'

export default class Logger {
  status(req: Request): void {
    console.log(`[HTTP ${req.method} ${new Date(Date.now()).toLocaleString()}] ${req.protocol}://${req.hostname}${req.url}`)
  }
}