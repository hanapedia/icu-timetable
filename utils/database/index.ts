#!/usr/bin/env node

import * as admin from 'firebase-admin';
import { Command } from 'commander';
import { migrateCoursesCollection } from './coursesCSV';
import { migrateUserCollection } from './usersJSON';
import 'dotenv/config';

// Set up command line args
const cmd = new Command();
cmd
  .option('-s, --src <path>', 'Source file path')
  .option('-c, --collection <path>', 'Collection path in database')
  .option('-t, --type <string>', 'Field to specify document type')
  .parse(process.argv);

// Firebase SDK initialization
admin.initializeApp({
  projectId: process.env.PROJECT_ID,
  // credential: admin.credential.cert(
  //   '/workspaces/icu-timetable/database/firebase-sdk-pk/icu-timetable-firebase-adminsdk-k0w9l-4b9b71c709.json'
  // ),

  // GOOGLE_APPLICATION_CREDENTIALS=/workspaces/icu-timetable/database/firebase-sdk-pk/icu-timetable-firebase-adminsdk-k0w9l-4b9b71c709.json
});
const db = admin.firestore();

// Main migration function
const migrate = async () => {
  try {
    const options = cmd.opts();
    const colPath = options.collection as string;
    const file = options.src as string;
    const type = options.type as string;

    // Exit if options are misssing
    if (!colPath) return Promise.reject('Missing Required option -c <path>');
    if (!file) return Promise.reject('Missing Required option -s <path>');

    switch (type) {
      case 'coursesCSV':
        await migrateCoursesCollection(db, colPath, file);
        break;
      case 'userJSON':
        await migrateUserCollection(db, colPath, file);
        break;
    }
  } catch (error) {
    console.log('Migration Failed. Firestore was not updated.\n', error);
  }
};

// Run
migrate();
