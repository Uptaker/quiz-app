export const config = {
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_USER: process.env.ADMIN_USERNAME,
  COOKIE_SECRET: process.env.COOKIE_SECRET ?? 'YourCookieValueHerePleaseChangeItToSomethingElse',
  SESSION_SECRET: process.env.SESSION_SECRET ?? 'YourSessionSecretHerePleaseChangeItToSomethingElse'
}