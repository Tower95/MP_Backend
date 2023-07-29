FROM node:18.13-alpine

WORKDIR /home/node/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./

CMD [ "node", "./bin/www" ]
