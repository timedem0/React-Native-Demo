import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default class History extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {title: 'History'};

  render() {

    const { params } = this.props.navigation.state;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 70}}>

        <Text>History</Text>
        <FlatList data={params.data} 
        renderItem={({item}) => <Text>{item.key}</Text>}
        />

      </View>
    );
  }
}