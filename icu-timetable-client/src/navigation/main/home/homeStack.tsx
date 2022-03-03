import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ScheduleScreen from 'screens/home/scheduleScreen';
import SettingsScreen from 'screens/home/settingsSceen';
import { TimetableStackNavigator } from 'navigation/main/home/timetable/timetableStackNavigator';

type HomeStackParamList = {
  Timetables: undefined;
  Schedule: undefined;
  Setting: undefined;
};

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Timetables' component={TimetableStackNavigator} />
      <Tab.Screen name='Schedule' component={ScheduleScreen} />
      <Tab.Screen name='Setting' component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export { HomeStack };
export type { HomeStackParamList };
