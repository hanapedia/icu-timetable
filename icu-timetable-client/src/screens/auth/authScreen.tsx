import { StatusBar } from 'expo-status-bar';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const AuthScreen = () => {
  const { register } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
      <Button onPress={register} title='register'>
        Register
      </Button>
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
