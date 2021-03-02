FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD node server.js
