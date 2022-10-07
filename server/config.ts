export const config = {
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD?.trim(),
  ADMIN_USER: process.env.ADMIN_USERNAME?.trim(),
  COOKIE_SECRET: process.env.COOKIE_SECRET?.trim() ?? 'YourCookieValueHerePleaseChangeItToSomethingElse',
  SESSION_SECRET: process.env.SESSION_SECRET?.trim() ?? 'YourSessionSecretHerePleaseChangeItToSomethingElse'
}