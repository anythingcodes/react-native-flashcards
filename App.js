import * as React from 'react';
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import reducers from './reducers';
import Home from './components/Home';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
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

const HomeStack = createStackNavigator();

function FlashcardsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Flashcards"
        component={Home}
        options={{
          title: 'Flashcards',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      />
      <HomeStack.Screen name="Deck" component={Deck} />
      <HomeStack.Screen name="Add Card" component={AddCardForm} />
    </HomeStack.Navigator>
  );
}

const NewDeckStack = createStackNavigator();

function NewDeckStackScreen() {
  return (
    <NewDeckStack.Navigator>
      <NewDeckStack.Screen name="New Deck" component={NewDeck} options={{ headerStyleInterpolator: forFade }} />
      <NewDeckStack.Screen name="Deck" component={Deck} options={{ headerStyleInterpolator: forFade }} />
    </NewDeckStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              // TODO: platform icons
              let iconName;
              let Component;
              if (route.name === 'Flashcards') {
                Component = MaterialCommunityIcons;
                iconName = focused
                  ? 'cards'
                  : 'cards-outline';
              } else if (route.name === 'New Deck') {
                Component = Ionicons;
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              }
              return <Component name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        >
          <Tab.Screen name="Flashcards" component={FlashcardsStackScreen} options={{ headerStyleInterpolator: forFade }}/>
          <Tab.Screen name="New Deck" component={NewDeckStackScreen} options={{ headerStyleInterpolator: forFade }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
