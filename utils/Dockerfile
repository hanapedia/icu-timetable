FROM node:16

WORKDIR /app

RUN apt-get update && apt-get upgrade

RUN apt-get install openjdk-8-jre

RUN npm install -g yarn

RUN yarn global add firebase-tools

RUN mkdir emulator && mkdir firestore && mkdir storage

COPY ./.firebaserc ./
COPY ./firebase.json ./
