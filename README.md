# Quiz App

- A quiz app for tests/quizzes using existing Excel/CSV files.
- Image support using a persistent Docker volume.
- Single-user login system for quiz management.

Built with Svelte/TypeScript/Bootstrap + Node/Express

All generated data and images are in the `/storage` folder and is persisted as a docker-compose volume.

## Deployment

Check the Dockerfile for details, use `docker-compose up --build` to build & launch.

It is recommended to use deploy to [**Fly.io**](https://fly.io/). It's free & automatically deploys the app by detecing the docker-compose file.

When Flyctl is downloaded, the setup is simple:

### Using Fly.io
You might need to log in via `flyctl auth login` first.
If debit card is tied, you get a 3GB volume/storage. Else you're limited to 1GB.

#### One time setup

Run these commands one-by-one, replace the secrets with anything you like:
```bash
flyctl launch
flyctl secrets set ADMIN_USERNAME=secret
flyctl secrets set ADMIN_PASSWORD=deusvult
flyctl secrets set SESSION_SECRET=YourSessionSecretHerePleaseChangeItToSomethingElse
flyctl volume create storage --size 1 --region fra # --size 3 if debit card tied to account
flyctl restart
```
  
#### After setup
- `flyctl deploy` to deploy for every update.

#### Useful commands
- `flyctl logs` to view logs
- `flyctl ssh console` to connect to the app terminal
- `flyctl restart` restart the app

## Development

Required 
- Node
- Docker
- Docker-compose

Build & start the app, served by Express on `localhost:8999`
```
docker-compose 
```

For dealing with only the UI on `localhost:8080`
```
npm start
```
