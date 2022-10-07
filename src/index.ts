// @ts-ignore
import App from './App.svelte'
import './main.css'
import {initSession} from './store/auth'

(async function checkAuth() {
  const res = await fetch('/api/user/check', {method: 'POST'}).catch(() => null)
  if (res?.ok) initSession()
})()


const app = new App({target: document.body,})

export default app