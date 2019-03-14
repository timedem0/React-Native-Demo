import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MyPlaces from './components/MyPlaces';
import Map from './components/Map';

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}

const MyApp = createStackNavigator({
  MyPlaces: {screen: MyPlaces},
  Map: {screen: Map},
});

const AppContainer = createAppContainer(MyApp);
