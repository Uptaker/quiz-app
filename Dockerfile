FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci

COPY . ./
RUN npm run build
RUN npm run build:server

FROM node:16-alpine

WORKDIR /app
COPY --from=build /app/build build

COPY *.json ./
RUN npm ci --production

COPY --from=build /app/build_server/ server

RUN mkdir storage

EXPOSE 8999
CMD ls server
CMD node server/server/server.js
