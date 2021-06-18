import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  card: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ff63475e',
  },
  heading: {
    fontSize: 35,
    lineHeight: 35,
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  subheading: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: '#333',
    marginBottom: 30
  },
});


const AddCardForm = ({ dispatch, navigation }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  // TODO: go home button
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Add Card</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Front"
        onChangeText={val => setFront(val)}
        defaultValue={front}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Back"
        onChangeText={val => setBack(val)}
        defaultValue={back}
      />
      <Button onPress={() => {
        // TODO:
      }} title="Add Card" buttonStyle={{ backgroundColor: 'white' }} textStyle={{color: 'black'}} />
      <Button onPress={() => {
        // TODO:
      }} title="Start Quiz" />
    </View>

  );
}

function mapStateToProps ({ cards }, props) {
  return {
    cards
  }
}

export default connect(mapStateToProps)(AddCardForm);
