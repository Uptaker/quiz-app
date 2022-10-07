# Quiz App

A quiz app for creating tests using existing Excel/CSV files.

Built with Svelte/TypeScript/Bootstrap + Node/Express

All generated data is in the `/storage` folder and is persisted as a docker-compose volume.

## Deployment

Check the Dockerfile for details, use `docker-compose up --build` to build & launch.

It is recommended to use deploy to [**Fly.io**](https://fly.io/). It's free & automatically deploys the app by detecing the docker-compose file.

When Flyctl is downloaded, it's as simple as:
- `flyctl launch` to create the project and launch (only once!)
- `flyctl deploy` to deploy for every update.

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
