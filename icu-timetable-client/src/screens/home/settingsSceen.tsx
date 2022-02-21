import { StatusBar } from 'expo-status-bar';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native';
import { CourseDocShort } from 'services/firebase/firestore';
import {
  UpdatableUserFields,
  userService,
} from 'services/firebase/firestore/users/userService';

const SettingsScreen = () => {
  const { authData } = useAuth();

  // #NO_FIREBASE_TEST use this tag to locate test code
  const formTestDataUser: UpdatableUserFields = {
    majorType: 'single',
    major: ['MCC'],
    studyAbroad: true,
  };

  const formTestDataTimetable: CourseDocShort[] = [
    {
      eName: 'Teaching Practicum in IB World School',
      jName: 'IB認定校での教育実習',
      courseDocId: '2020W32106',
      schedule: ['2/W', '2/M'],
    },
    {
      eName: 'Global Sociology',
      jName: '国際社会学',
      courseDocId: '2020W31288',
      schedule: ['1/SA', '2/SA', '3/SA'],
    },
  ];

  const updateUserHandler = async (
    e: NativeSyntheticEvent<NativeTouchEvent>
  ) => {
    if (authData) {
      try {
        await userService.updateUser(authData?.uid, formTestDataUser);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('User is not logged in');
    }
  };

  const updateScheduleHandler = async (
    e: NativeSyntheticEvent<NativeTouchEvent>
  ) => {
    if (authData) {
      try {
        await userService.updateUserTimetable(
          authData?.uid,
          '2020W',
          formTestDataTimetable
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('User is not logged in');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button onPress={updateUserHandler} title='update user'>
        Update User
      </Button>
      <Button onPress={updateScheduleHandler} title='update timetable'>
        Update timetable
      </Button>
      <StatusBar style='auto' />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
