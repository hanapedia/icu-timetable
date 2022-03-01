import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  TimetableScreen,
  TimetableSettingsScreen,
  TimetableEditScreen,
} from 'screens/home/timetable';
import React from 'react';
import { YearTerm } from 'types/icuSpecificTypes';

type TimetableStackParamList = {
  Timetable: {
    yearTerm: YearTerm;
  };
  Settings: undefined;
  Edit: undefined;
};

const TimetableStack = createNativeStackNavigator<TimetableStackParamList>();

const TimetableStackNavigator = () => {
  return (
    <TimetableStack.Navigator initialRouteName='Timetable'>
      <TimetableStack.Group>
        <TimetableStack.Screen
          name='Timetable'
          component={TimetableScreen}
          initialParams={{ yearTerm: '2022S' }}
        />
        <TimetableStack.Screen
          name='Settings'
          component={TimetableSettingsScreen}
        />
      </TimetableStack.Group>
      <TimetableStack.Group screenOptions={{ presentation: 'modal' }}>
        <TimetableStack.Screen name='Edit' component={TimetableEditScreen} />
      </TimetableStack.Group>
    </TimetableStack.Navigator>
  );
};

export { TimetableStackNavigator };
export type { TimetableStackParamList };
