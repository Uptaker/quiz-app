import express, {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import logger from './Logger'
import {AdminRoute} from './routes/route.admin'
import {StorageRoute} from "./routes/route.storage";
import path from "path";

const cookieSecret: string = process.env.COOKIE_SECRET ?? 'YourCookieValueHereToDetectTampering'
const port = process.env.PORT ?? 8999
const app = express()
app.use(cookieParser(cookieSecret))
app.use(express.static('build'))

app.get('*', (req: Request, res: Response) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../build')})
})

app.get('/api/health', async (req: Request, res: Response) => res.sendStatus(204))

app.post('/api/user/login', (req: Request, res: Response) => AdminRoute.login(req, res))
app.get('/api/user/check', (req: Request, res: Response) => AdminRoute.login(req, res))

app.post('/api/quiz/upload', StorageRoute.upload.array('files'),(req: Request, res: Response) => StorageRoute.store(req, res))


function initVerbose() {
  logger.log(`Listening on port: ${port}`)
}

app.listen(port, () => {
  initVerbose()
})