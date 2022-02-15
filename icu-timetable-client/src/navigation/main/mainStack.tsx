import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeStack from './home/homeStack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Main' component={HomeStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
