
import React, { useEffect } from 'react';
import { FlatList, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import {receiveDecks} from '../actions';
import { fetchFlashcards } from '../utils/api';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  card: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ff63475e',
  },
  heading: {
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  subheading: {
    fontSize: 14,
    letterSpacing: 0.25,
    color: '#333',
  },
});

function Home({ decks, dispatch, navigation }) {

  useEffect(() => {
    fetchFlashcards().then((decks) => dispatch(receiveDecks(decks)))
  }, []);

  const renderItem = ({ item: { title, questions }}) => (
    <Pressable style={styles.card} onPress={() => navigation.navigate('Deck', { title })}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.subheading}>{questions.length} cards</Text>
    </Pressable>
  );

  return (
    <SafeAreaView styles={styles.container}>
      <FlatList data={decks} renderItem={renderItem} keyExtractor={item => item.title} />
    </SafeAreaView>
  );
}

function mapStateToProps ({ decks }) {
  return {
    decks: Object.keys(decks).map(deck => decks[deck])
  }
}

export default connect(mapStateToProps)(Home);
