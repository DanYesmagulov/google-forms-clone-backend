FROM node:15

RUN apt-get update \
    && apt-get install openssh-client -y \
    && apt-get install wait-for-it

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

ENV MODE prod
ENV CLI_PATH /app/dist/cli.js

CMD npm run start:${MODE}
