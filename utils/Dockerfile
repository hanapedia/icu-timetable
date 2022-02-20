FROM node:16-bullseye

WORKDIR /app

RUN apt-get update

RUN apt-get install -y openjdk-11-jdk

# RUN npm install -g yarn

RUN yarn global add firebase-tools

RUN mkdir emulator && mkdir firestore && mkdir storage

COPY ./.firebaserc ./
COPY ./firebase.json ./
