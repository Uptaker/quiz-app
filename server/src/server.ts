import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

class Logger {
  status(req: Request): void {
    console.log(`[HTTP ${req.method} ${new Date(Date.now()).toLocaleString()}] ${req.protocol}://${req.hostname}${req.url}`)
  }
}

const log = new Logger()
const app = express()
const PORT = process.env.PORT || 3000

let value = 0
let lastUpdate = Date.now()

app.use(cors())


app.use(express.json())
app.use('/', express.static('../ui/dist'))

app.get('/status', (req: Request, res: Response) => {
  log.status(req)
  res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Node Server listening on port ${PORT}!`));