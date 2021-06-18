import React from 'react';
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { createStackNavigator } from '@react-navigation/stack';
import reducers from './reducers';
import Home from './components/Home'
import Deck from './components/Deck'
import AddCardForm from './components/AddCardForm';

const store = createStore(combineReducers({ decks: reducers }));

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function FlashcardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Decks"
        component={Home}
        options={{
          title: 'Decks',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      />
      <Stack.Screen
        name="Deck"
        component={Deck}
        options={({ route }) => ({
          title: route.params.title,
          headerStyleInterpolator: forFade
        })}
      />
      <Stack.Screen
        name="Add Card"
        component={AddCardForm}
        options={() => ({
          title: 'Add Card',
          headerStyleInterpolator: forFade
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <FlashcardStack />
      </NavigationContainer>
    </Provider>
  );
}
