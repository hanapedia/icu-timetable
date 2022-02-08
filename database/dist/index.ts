#!/usr/bin/env node

import * as admin from 'firebase-admin';
import { Command } from 'commander';
import { CourseDoc, generateCourseDocId, ReadCoursesCSV } from './coursesCSV';

// Set up command line args
const cmd = new Command();
cmd
  .option('-s, --src <path>', 'Source file path')
  .option('-c, --collection <path>', 'Collection path in database')
  .option('-t, --type<string>', 'Field to specify document type')
  .parse(process.argv);

// Firebase SDK initialization
admin.initializeApp({
  credential: admin.credential.cert(
    '/workspaces/icu-timetable/database/firebase-sdk-pk/icu-timetable-firebase-adminsdk-k0w9l-4b9b71c709.json'
  ),
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

    const colRef = db.collection(colPath);

    const data: CourseDoc[] = await ReadCoursesCSV(file);
    const batchSize = 500;
    const batchNum = Math.ceil(data.length / batchSize);

    for (let batchN = 0; batchN < batchNum; batchN++) {
      const batch = db.batch();
      const batchData = data.slice(
        batchN * batchSize,
        (batchN + 1) * batchSize
      );
      for (const item of batchData) {
        const docId = generateCourseDocId(item);
        const docRef = colRef.doc(docId);

        // as firestore does not support custom prototypes, convert to plain object
        const plainItem = JSON.parse(JSON.stringify(item));

        batch.set(docRef, plainItem);
      }
      try {
        await batch.commit();
        console.log(
          `migrated batch ${batchN}(${batchN * batchSize}~${
            (batchN + 1) * batchSize
          }), successfully`
        );
      } catch (error) {
        console.log('migrating batch', batchN, 'failed', error);
      }
    }
    console.log('Migration completed. Firestore updated.');
  } catch (error) {
    console.log('Migration Failed. Firestore was not updated.\n', error);
  }
};

// Run
migrate();
