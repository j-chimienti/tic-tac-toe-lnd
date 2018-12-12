FROM node:8-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${APP_PORT}
CMD node bin/www.js
