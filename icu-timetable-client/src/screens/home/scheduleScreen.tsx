import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { HomeStackParamList } from 'navigation/main/home/homeStack';
import React, { FC, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { UserDoc } from 'services/firebase/firestore';
import {
  QueryParams,
  userService,
} from 'services/firebase/firestore/users/userService';

type ScheduleScreenProps = BottomTabNavigationProp<
  HomeStackParamList,
  'Schedule'
>;

const ScheduleScreen: FC<ScheduleScreenProps> = (navigation) => {
  const testFormUserId = 'iDWw77nnZ0ZxJSNz1pn3EujaSG2Y';
  const testFormQueryParams: QueryParams = {
    major: ['ISC', 'PSY'],
  };

  const [queryResult, setQueryResult] = useState<UserDoc[] | null>(null);

  const getUserByIdHandler = async (
    e: NativeSyntheticEvent<NativeTouchEvent>
  ) => {
    const user = await userService.getUserById(testFormUserId);
    if (user) {
      await setQueryResult([user]);
    } else {
      console.log('No user with matching id');
    }
  };

  const getUserByfieldsHandler = async (
    e: NativeSyntheticEvent<NativeTouchEvent>
  ) => {
    const users = await userService.getUserByFields(testFormQueryParams);
    if (users) {
      await setQueryResult(users);
    } else {
      console.log('No user with matching Fields');
    }
  };

  const renderItem: ListRenderItem<UserDoc> = ({ item }) => (
    <Text>{item.uid}</Text>
  );

  return (
    <View style={styles.container}>
      <Text>Users</Text>
      <Button onPress={getUserByIdHandler} title='get user by id' />
      <Button onPress={getUserByfieldsHandler} title='get user by fields' />
      <FlatList
        data={queryResult}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
      <StatusBar style='auto' />
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
