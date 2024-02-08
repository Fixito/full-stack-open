FROM node:20

ENV CHOKIDAR_USEPOLLING=true

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]