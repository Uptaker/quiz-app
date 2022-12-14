import express, {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import sessions from 'express-session'
import {AdminRoute} from './routes/AdminRoute'
import {config} from './config'
import {week} from '../src/utils'
import {log} from './utils/Logger'
import {QuizRoute} from './routes/QuizRoute'
import {ImagesRoute} from './routes/ImagesRoute'

const port = process.env.PORT ?? 8999
const app = express()

export let session: string
app.use(sessions({
  secret: config.SESSION_SECRET,
  saveUninitialized: true,
  cookie: { maxAge: week },
  resave: false
}));
app.use(express.json())

app.use(cookieParser(config.COOKIE_SECRET))

app.get('/api/health', (req: Request, res: Response) => res.sendStatus(204))

app.post('/api/user/login', (req: Request, res: Response) => AdminRoute.login(req, res, () => session = req.session.id))
app.post('/api/user/check', (req: Request, res: Response) => AdminRoute.check(req, res))
app.post('/api/user/logout', (req: Request, res: Response) => AdminRoute.logout(req, res))

app.post('/api/quiz/', [AdminRoute.routeGuard ,QuizRoute.upload.array('files')], (req: Request, res: Response) => QuizRoute.store(req, res))
app.get('/api/quiz/', (req: Request, res: Response) => QuizRoute.readList(req, res))
app.get('/api/quiz/:uuid', (req: Request, res: Response) => QuizRoute.read(req, res))
app.put('/api/quiz/:uuid', AdminRoute.routeGuard,(req: Request, res: Response) => QuizRoute.update(req, res))
app.delete('/api/quiz/:uuid', AdminRoute.routeGuard, (req: Request, res: Response) => QuizRoute.deleteQuiz(req, res))

app.post('/api/image/', [AdminRoute.routeGuard, ImagesRoute.upload.array('files')], (req: Request, res: Response) => ImagesRoute.store(req, res))
app.get('/api/image/', (req: Request, res: Response) => ImagesRoute.readList(req, res))
app.get('/api/image/:name', (req: Request, res: Response) => ImagesRoute.read(req, res))
app.delete('/api/image/:name', AdminRoute.routeGuard, (req: Request, res: Response) => ImagesRoute.delete(req, res))

app.use(express.static('build'))
app.get('*', (req: Request, res: Response) => {
  res.sendFile('/app/build/index.html')
})


function initVerbose() {
  log.info(`Started - Listening on port: ${port}`)
}

app.listen(port, () => {
  initVerbose()
})