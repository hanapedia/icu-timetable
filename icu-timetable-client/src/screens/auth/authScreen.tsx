import { AuthFormData } from 'contexts/authContext';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import {
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AuthScreen = () => {
  const { registerLocal, authData } = useAuth();

  // #NO_FIREBASE_TEST use this tag to locate test code
  const formTestData: AuthFormData = {
    gradYear: 23,
    matriMonth: 'april',
    majorType: 'minor',
    major: ['ISC', 'BUS'],
    studyAbroad: false,
  };

  const registerHandler = async (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    try {
      await registerLocal(formTestData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
      <Button onPress={registerHandler} title='register'>
        Register
      </Button>
      <Text>{authData?.uid}</Text>
      <StatusBar style='auto' />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
