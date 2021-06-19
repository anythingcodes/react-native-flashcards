
import React, { useEffect } from 'react';
import { FlatList, Text, StyleSheet, Pressable, View } from 'react-native';
import { receiveDecks} from '../actions';
import { fetchFlashcards } from '../utils/api';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import styles from '../utils/styles';

const pageStyles = StyleSheet.create({
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
      <Text style={pageStyles.subheading}>{questions.length} cards</Text>
    </Pressable>
  );

  return (
    <SafeAreaView styles={styles.container}>
      <FlatList data={decks} renderItem={renderItem} keyExtractor={item => item.title} style={{ paddingBottom: 50 }} />
    </SafeAreaView>
  );
}

function mapStateToProps ({ decks }) {
  return {
    decks: Object.keys(decks).map(deck => decks[deck])
  }
}

export default connect(mapStateToProps)(Home);
