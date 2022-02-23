import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const formGroup: ViewStyle = {
  flex: 5,
  backgroundColor: '#fff',
  alignItems: 'stretch',
  justifyContent: 'center',
};

const submitGroup: ViewStyle = {
  flex: 3,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
};

const text: TextStyle = {
  textAlign: 'left',
};

const formEntryContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'stretch',
  height: 80,
};

const formElementContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const formEntryTitleContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const formEntryTitleText: TextStyle = {
  textAlign: 'left',
};

const buttonContainer: ViewStyle = {
  width: 250,
  marginHorizontal: 40,
  marginVertical: 10,
};

const buttonBox: ViewStyle = {
  borderColor: 'rgba(78, 116, 289, 1)',
};

const buttonText: TextStyle = {
  color: 'rgba(78, 116, 289, 1)',
};

export const authFormStyle = StyleSheet.create({
  formGroup: formGroup,
  submitGroup: submitGroup,
  text: text,
  formEntryContainer: formEntryContainer,
  formElementContainer: formElementContainer,
  formEntryTitleContainer: formEntryTitleContainer,
  formEntryTitleText: formEntryTitleText,
  buttonContainer: buttonContainer,
  buttonBox: buttonBox,
  buttonText: buttonText,
});
