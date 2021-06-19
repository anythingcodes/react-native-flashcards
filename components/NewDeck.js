

import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import Button from './Button';
import styles from '../utils/styles';

const NewDeck = ({ dispatch, navigation }) => {
  const [title, setTitle] = useState('');

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>What is the title of your new deck?</Text>
      <TextInput
        autoFocus={true}
        style={{ height: 40 }}
        placeholder="Deck title"
        onChangeText={val => setTitle(val)}
        defaultValue={title}
      />

      <Button onPress={() => {
        // TODO: validation
        if (title) {
          dispatch(addDeck({
            [title]: {
              title,
              questions: []
            }
          }));
          navigation.navigate('Deck', { title });
        }
      }} title="Create Deck" />
    </View>

  );
}

function mapStateToProps ({ cards }) {
  return {
    cards
  }
}

export default connect(mapStateToProps)(NewDeck);
