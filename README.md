# icu-timetable

If you have VSCode Remote - Containers extention installed, you can reopen the directory as a remote container to start working right away.

## Directories

/database directory holds the tools for converting csv data into json, and saving it to Cloud Firestore.

/icu-timetable-client holds the react native application created using expo.

## Installation

### database tools

Installing the required packages.

```
cd databse
yarn install
```

using the tool

```
ts-node dist/index
```

### client app

For Development

```
cd icu-timetable-client
yarn install
yarn start // or expo start
```
