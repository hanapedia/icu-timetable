import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import AuthStack from 'navigation/auth/authStack';
import MainStack from 'navigation/main/mainStack';

const Router = () => {
  const { authData, isLoading } = useAuth();

  return (
    <NavigationContainer>
      {authData ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default Router;
