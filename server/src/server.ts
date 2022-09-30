import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import Logger from './Logger.js'
import { Pool } from 'pg'
import {env} from './config'
dotenv.config()

const log = new Logger()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

const pgClient = new Pool({
 user: env.dbUser,
 host: env.dbHost,
 database: env.dbDatabase,
 password: env.dbPassword,
 port: env.dbPort
})

pgClient.on('connect', client => {
  client.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => console.log(err))
})

app.use(express.json())
app.use('/', express.static('../ui/dist'))

app.get('/status', (req: Request, res: Response) => {
  log.status(req)
  res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Node Server listening on port ${PORT}!`));