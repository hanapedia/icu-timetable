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
  textAlign: 'center',
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

const pickerFormContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: 80,
};

const pickerContainer: ViewStyle = {
  flex: 5,
  backgroundColor: 'blue',
};

const pickerTitleContainer: ViewStyle = {
  flex: 1,
};

const pickerOptionContainer: ViewStyle = {};

export const authFormStyle = StyleSheet.create({
  formGroup: formGroup,
  submitGroup: submitGroup,
  text: text,
  buttonContainer: buttonContainer,
  buttonBox: buttonBox,
  buttonText: buttonText,
  pickerContainer: pickerContainer,
  pickerFormContainer: pickerFormContainer,
  pickerTitleContainer: pickerTitleContainer,
  pickerOptionContainer: pickerOptionContainer,
});
