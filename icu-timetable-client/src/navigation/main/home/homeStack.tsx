import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ScheduleScreen from 'screens/home/scheduleScreen';
import SettingsScreen from 'screens/home/settingsSceen';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Schedule' component={ScheduleScreen} />
      <Tab.Screen name='Setting' component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default HomeStack;
