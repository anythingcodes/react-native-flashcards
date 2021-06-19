import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const FLASHCARD_STORAGE_KEY = 'Flashcards:deckStorage'
export const NOTIFICATION_KEY = 'Flashcards:notifications'

function setDummyData () {

  const dummyData =  {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export function formatFlashcards (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(() => {
      if (typeof Notifications !== 'undefined') {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
    })
}

export function createNotification () {
  return {
    title: 'Time to study!',
    body: '👋 Don\'t forget to study your flashcards today!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
          if (data === null) {
              Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                  ({ status }) => {
                      if (status === 'granted') {
                          if (typeof Notifications !== 'undefined') {
                            Notifications.cancelAllScheduledNotificationsAsync();
                          }

                          let tomorrow = new Date()
                          tomorrow.setDate(tomorrow.getDate() + 1)
                          tomorrow.setHours(20)
                          tomorrow.setMinutes(0)

                          if (typeof Notifications !== 'undefined') {
                            Notifications.scheduleLocalNotificationAsync(
                              createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );
                          }

                          AsyncStorage.setItem(
                              NOTIFICATION_KEY,
                              JSON.stringify(true)
                          );
                      }
                  }
              );
          }
      });
  }
