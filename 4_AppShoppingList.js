import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {input: '', data: []}
  }

  buttonAdd = () => {
    let x = this.state.input;
    this.setState({input: '',
      data: [...this.state.data, {key: `${x}`}]});
  }

  buttonClear = () => {
    this.setState({inputOne: '', data: []});
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
        <View style={{flex: 1}}>
          <TextInput style={{width:200, borderColor:'gray', borderWidth:1}}
            onChangeText={(input) => this.setState({input})}
            value={this.state.input}
          />
        </View>
        <View style={{flex: 1, width: 150, flexDirection:'row', alignItems: 'flex-start', justifyContent: 'space-around', padding: 20}}>
          <Button onPress={this.buttonAdd} title="ADD" />
          <Button onPress={this.buttonClear} title="CLEAR" />
        </View>
        <View style={{flex: 4}}>
          <Text style={{color: 'blue'}}>SHOPPING LIST</Text>
          <FlatList data={this.state.data} 
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    );
  }
}
