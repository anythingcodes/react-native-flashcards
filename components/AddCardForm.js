import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';
import styles from '../utils/styles';
import { addCard } from '../actions';

const AddCardForm = ({ dispatch, title, navigation }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Add Card to '{title}' deck</Text>
      <TextInput
        autoFocus={true}
        style={{ height: 40 }}
        placeholder="Enter question"
        onChangeText={val => setQuestion(val)}
        defaultValue={question}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Enter answer"
        onChangeText={val => setAnswer(val)}
        defaultValue={answer}
      />
      <Button onPress={() => {
        // TODO:
        console.log('add card');
        const card = { question, answer };
        dispatch(addCard({
          card,
          key: title
        }));
        navigation.navigate('Deck', { title });

      }} title="Add Card" buttonStyle={{ backgroundColor: 'white' }} textStyle={{color: 'black'}} />
      <Button onPress={() => {
        // TODO:
        console.log('start quiz');
      }} title="Start Quiz" />
    </View>
  );
}

function mapStateToProps ({ cards }, { route: { params: { title } } }) {
  return {
    title,
    cards
  }
}

export default connect(mapStateToProps)(AddCardForm);
