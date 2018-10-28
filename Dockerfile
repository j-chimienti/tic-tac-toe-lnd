FROM node:8-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 4321
CMD node app.js
