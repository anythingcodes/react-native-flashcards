
import React from 'react';
import { connect } from 'react-redux';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import {addDeck} from '../actions'

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


const Deck = ({ dispatch, navigation, deck: { title, questions } }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.subheading}>{questions.length} cards</Text>
      <Button onPress={() => {
        // TODO:
        const key = new Date().toLocaleTimeString();
        console.log(`adding ${key}`);
        dispatch(addDeck({
          [key]: {
            title: key,
            questions: []
          }
        }));
      }} title="Add Card" buttonStyle={{ backgroundColor: 'white' }} textStyle={{color: 'black'}} />
      <Button onPress={() => console.log('meow')} title="Start Quiz" />
    </View>
  );
}

function mapStateToProps ({ decks }, { route: { params: { title } }}) {
  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(Deck);
