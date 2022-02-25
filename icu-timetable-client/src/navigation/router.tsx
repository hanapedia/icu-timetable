import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { AuthStackNavigator } from 'navigation/auth/authStackNavigator';
import MainStackNavigator from 'navigation/main/mainStackNavigator';

const Router = () => {
  const { authData, isLoading } = useAuth();

  return (
    <NavigationContainer>
      {authData ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Router;
