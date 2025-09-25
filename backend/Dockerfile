FROM node:20-alpine

RUN apk update && apk upgrade

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD [ "nodemon", "src/server.js" ]