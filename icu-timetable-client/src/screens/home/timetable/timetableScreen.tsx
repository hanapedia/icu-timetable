import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TimetableStackParamList } from 'navigation/main/home/timetable/timetableStackNavigator';
import React, { FC, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { destructureYearTermString } from 'res';
import { globalStyle } from 'styles/globalStyle';
import { TimetableUi } from 'components/timetable/gridUi';

type TimetableScreenProps = NativeStackScreenProps<
  TimetableStackParamList,
  'Timetable'
>;

const TimetableScreen: FC<TimetableScreenProps> = ({ navigation, route }) => {
  useLayoutEffect(() => {
    const { year, term } = destructureYearTermString(route.params.yearTerm);
    navigation.setOptions({ headerTitle: `${year} ${term}` });
  });
  return (
    <View style={globalStyle.container}>
      <TimetableUi yearTerm={route.params.yearTerm} />
    </View>
  );
};

export { TimetableScreen };
