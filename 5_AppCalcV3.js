import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Calculator from './components/Calculator';
import History from './components/History';

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}

const MyApp = createStackNavigator({
  Calculator: {screen: Calculator},
  History: {screen: History}
});

const AppContainer = createAppContainer(MyApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
