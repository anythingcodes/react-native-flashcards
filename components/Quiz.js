import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';
import styles from '../utils/styles';

// Styles
const { width } = Dimensions.get('window');
const pageStyles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  answer: {
    paddingHorizontal: 20
  },
  flipCard: {
    width: width - 20,
    margin: 10,
    height: 200,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#ddd'
  },
})

const Quiz = ({ navigation, questions, title }) => {
  // Current question in deck
  const [ index, setIndex ] = useState(0);
  let question = '';
  let answer = '';
  if (questions[index]) {
    question = questions[index].question;
    answer = questions[index].answer;
  }
  const isComplete = index === questions.length;

  // Score
  const [ total, setTotal ] = useState(0);

  // Flip animation
  const [ animatedValue, setAnimatedValue ] = useState(new Animated.Value(0));
  const [ value, setValue ] = useState(0);
  animatedValue.addListener(({ value}) => setValue(value));
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  })
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });
  const frontAnimatedStyle = {
    transform: [
      { rotateY: frontInterpolate}
    ]
  }
  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate}
    ]
  }
  const flipCard = () => {
    if (value >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }
  }

  // Restart quiz
  const restartQuiz = () => {
    if (value >= 90) {
      flipCard();
    }
    setTotal(0);
    setIndex(0);
  }

  // Shared headings on each card side
  const headings = (
    <View>
      <Text style={styles.heading}>{index + 1 } / {questions.length}</Text>
      <Text style={styles.heading}>{question}</Text>
    </View>
  );

  return (
    <View style={pageStyles.wrapper}>
      {!isComplete && <View>
        <View>
          <Animated.View style={[pageStyles.flipCard, frontAnimatedStyle ]}>
            {headings}
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, pageStyles.flipCard, pageStyles.flipCardBack]}>
            {headings}
            {value >= 90 && <Text style={pageStyles.answer}>{answer}</Text>}
          </Animated.View>
        </View>
        <Button buttonStyle={{  marginBottom: 60, alignSelf: 'center', width: width / 2 }} title={`Show ${value >= 90 ? 'Question' : 'Answer'}`} onPress={flipCard} />
        <View>
          <Button
            onPress={() => {
              if (value >= 90) {
                flipCard();
              }
              setTotal(total + 1);
              setIndex(index + 1);
            }}
            title="Mark correct"
            buttonStyle={{ alignSelf: 'center', backgroundColor: 'green' }}
            textStyle={{color: 'black'}}
          />
          <Button
            onPress={() => {
              if (value >= 90) {
                flipCard();
              }
              setIndex(index + 1);
            }}
            title="Mark incorrect"
            buttonStyle={{ alignSelf: 'center',  backgroundColor: 'red' }}
          />
        </View>
      </View>}
      {isComplete && <View>
        <Text style={[styles.heading, { margin: 20, paddingTop: 5, marginTop: 30, textAlign: 'center' }]}>{total / questions.length > .8 ? '🎉 Awesome!' : '🙃 Whoops. Want to try again?'} You scored {Math.round((total / questions.length) * 100)}%.</Text>
        <Button title="Restart Quiz" onPress={() => restartQuiz()} buttonStyle={{ alignSelf: 'center' }} />
        <Button title="Back to Deck" onPress={() => navigation.navigate('Deck', { title })} buttonStyle={{ alignSelf: 'center', backgroundColor: 'white' }} textStyle={{ color: 'black' }} />
      </View>}
    </View>
  );
}

function mapStateToProps ({ cards }, { route: { params: { title, questions } } }) {
  return {
    cards,
    title,
    questions
  }
}

export default connect(mapStateToProps)(Quiz);
