import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthFormProvider } from 'contexts/authFormContext';
import React from 'react';
import {
  AuthScreen,
  GradeFormScreen,
  MajorFormScreen,
  AuthFormSubmitScreen,
} from 'screens/auth';

type AuthStackParamList = {
  Welcome: undefined;
  ID: undefined;
  Major: undefined;
  Other: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthFormProvider>
      <AuthStack.Navigator initialRouteName='Welcome'>
        <AuthStack.Screen name='Welcome' component={AuthScreen} />
        <AuthStack.Screen name='ID' component={GradeFormScreen} />
        <AuthStack.Screen name='Major' component={MajorFormScreen} />
        <AuthStack.Screen name='Other' component={AuthFormSubmitScreen} />
      </AuthStack.Navigator>
    </AuthFormProvider>
  );
};

export { AuthStackNavigator };
export type { AuthStackParamList };
