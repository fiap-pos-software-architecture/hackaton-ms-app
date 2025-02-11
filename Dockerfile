FROM node:18-slim

RUN apt-get update && apt-get install -y nano

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV MYSQL_USER=app_user \
    MYSQL_PASSWORD=ms_app_password \
    MYSQL_DATABASE=hackaton_app_BD \
    MYSQL_HOST=mysql-db-hackaton \
    MYSQL_PORT=3306

EXPOSE 3000

CMD [ "npm", "start" ]
