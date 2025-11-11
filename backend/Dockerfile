FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm install

COPY . .


RUN npx prisma generate

RUN npm install -g nodemon

EXPOSE 3000

CMD [ "nodemon", "src/server.js" ]