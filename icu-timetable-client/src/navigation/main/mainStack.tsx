import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeStack from 'navigation/main/home/homeStack';
import { Button } from 'react-native';
import { useAuth } from 'hooks/useAuth';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const { unregisterLocal } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Main'
        component={HomeStack}
        options={{
          headerTitle: 'Home',
          headerRight: () => (
            <Button title='unregister' onPress={unregisterLocal}></Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
