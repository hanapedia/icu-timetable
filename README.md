# icu-timetable

If you have VSCode Remote - Containers extention installed, you can reopen the directory as a remote container to start working right away.

## Directories

/utils directory holds the tools for firebase testing and migration

/icu-timetable-client holds the react native application created using expo.

## Installation

### database tools

Installing the required packages.

```
cd databse
yarn install
```

using the tools

```
ts-node <tools directory>/index
```

### client app

For Development

```
cd icu-timetable-client
yarn install
yarn start // or expo start
```

Use Local Firebase Emulator

```
cd utils
firebase login
firebase emulators:start --import=./emulator --export-on-exit
```

This persists local dvelopment changes /utils/emulator
