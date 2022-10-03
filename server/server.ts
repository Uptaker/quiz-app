import express, {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import logger from './Logger'
import {AdminRoute} from './routes/route.admin'
import {StorageRoute} from './routes/route.storage'
import path from 'path'

const cookieSecret: string = process.env.COOKIE_SECRET ?? 'YourCookieValueHereToDetectTampering'
const port = process.env.PORT ?? 8999
const app = express()
app.use(cookieParser(cookieSecret))

app.get('/api/health', async (req: Request, res: Response) => res.sendStatus(204))

app.post('/api/user/login', (req: Request, res: Response) => AdminRoute.login(req, res))
app.get('/api/user/check', (req: Request, res: Response) => AdminRoute.login(req, res))

app.post('/api/quiz/', StorageRoute.upload.array('files'), (req: Request, res: Response) => StorageRoute.store(req, res))
app.post('/api/quiz/:uuid', StorageRoute.upload.single('files'), (req: Request, res: Response) => StorageRoute.update(req, res))
app.get('/api/quiz/', (req: Request, res: Response) => StorageRoute.readQuizList(req, res))
app.get('/api/quiz/:uuid', (req: Request, res: Response) => StorageRoute.readQuiz(req, res))

app.use(express.static('build'))
app.get('*', (req: Request, res: Response) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../build')})
})


function initVerbose() {
  logger.log(`Started - Listening on port: ${port}`)
}

app.listen(port, () => {
  initVerbose()
})