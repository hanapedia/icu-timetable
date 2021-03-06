import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeStack } from 'navigation/main/home/homeStack';
import { Button } from 'react-native';
import { useAuth } from 'hooks';

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const { unregister, authData } = useAuth();
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name='Main'
        component={HomeStack}
        options={{
          headerTitle: authData?.uid,
          headerRight: () => (
            <Button title='unregister' onPress={unregister}></Button>
          ),
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
