export const env = {
  dbUser: process.env.DB_USER as string | undefined,
  dbHost: process.env.DB_HOST as string | undefined,
  dbDatabase: process.env.DB_DATABASE as string | undefined,
  dbPassword: process.env.DB_PASSWORD as string | undefined,
  dbPort: process.env.DB_PORT as number | undefined,
}