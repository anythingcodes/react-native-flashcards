
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import styles from '../utils/styles';

const pageStyles = StyleSheet.create({
  subheading: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: '#333',
    marginBottom: 30
  },
});

const Deck = ({ dispatch, navigation, deck: { title, questions }}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={pageStyles.subheading}>{questions.length} cards</Text>
      <Button onPress={() => navigation.navigate('Add Card', { title })} title="Add Card" buttonStyle={{ backgroundColor: 'white' }} textStyle={{color: 'black'}} />
      <Button onPress={() => navigation.navigate('Quiz', { questions, title })} title="Start Quiz" />
    </View>
  );
}

function mapStateToProps ({ decks }, { route: { params: { title } }}) {
  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(Deck);
