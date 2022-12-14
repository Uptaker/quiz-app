import {writable} from 'svelte/store'

export const isAdmin = writable<boolean>(false)

export function initSession() {
  isAdmin.set(true)
}

export async function logout() {
  try {
    await fetch('/api/user/logout', {method: 'POST'})
    setTimeout(() => location.href = '/', 0)
  } catch (e) {
    setTimeout(location.href = '/', 0)
  }
}