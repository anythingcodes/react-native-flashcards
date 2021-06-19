import * as React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const componentStyles = StyleSheet.create({
  button: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 4,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default function Button({ buttonStyle, onPress, textStyle, title }) {
  return (
    <Pressable style={[ componentStyles.button, buttonStyle ]} onPress={onPress}>
      <Text style={[componentStyles.text, textStyle ]}>{title}</Text>
    </Pressable>
  );
}
