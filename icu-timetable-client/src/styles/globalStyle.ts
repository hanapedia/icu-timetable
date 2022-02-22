import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const container: ViewStyle = {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'stretch',
  justifyContent: 'center',
};

const text: TextStyle = {
  textAlign: 'center',
  padding: 5,
};

export const globalStyle = StyleSheet.create({
  container: container,
  text: text,
});
