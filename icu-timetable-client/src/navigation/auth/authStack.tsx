import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthScreen from 'screens/auth/authScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Sign Up' component={AuthScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
