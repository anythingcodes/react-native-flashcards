import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';
import styles from '../utils/styles';

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
        console.log('add card');
      }} title="Add Card" buttonStyle={{ backgroundColor: 'white' }} textStyle={{color: 'black'}} />
      <Button onPress={() => {
        // TODO:
        console.log('start quiz');
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
