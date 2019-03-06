import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {inputOne: '', inputTwo: '', result: '', data: []}
  }

  buttonPlus = () => {
    let x = Number(this.state.inputOne) + Number(this.state.inputTwo);
    this.setState({inputOne: '', inputTwo: '', result: x,
      data: [...this.state.data, {key: `${this.state.inputOne} + ${this.state.inputTwo} = ${x}`}]});
  }

  buttonMinus = () => {
    let x = Number(this.state.inputOne) - Number(this.state.inputTwo);
    this.setState({inputOne: '', inputTwo: '', result: x,
      data: [...this.state.data, {key: `${this.state.inputOne} - ${this.state.inputTwo} = ${x}`}]});
  }

  buttonClear = () => {
    this.setState({inputOne: '', inputTwo: '', result: ''});
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
        <View style={{flex: 1}}>
          <Text>Result: {this.state.result}</Text>
          <TextInput style={{width:200, borderColor:'gray', borderWidth:1}}
            keyboardType='numeric'
            onChangeText={(inputOne) => this.setState({inputOne})}
            value={this.state.inputOne}
          />
          <TextInput style={{width:200, borderColor:'gray', borderWidth:1}}
            keyboardType='numeric'
            onChangeText={(inputTwo) => this.setState({inputTwo})}
            value={this.state.inputTwo}
          />
        </View>
        <View style={{flex: 1, width: 150, flexDirection:'row', alignItems: 'flex-start', justifyContent: 'space-around', padding: 20}}>
          <Button onPress={this.buttonPlus} title="+" />
          <Button onPress={this.buttonClear} title="C" />
          <Button onPress={this.buttonMinus} title="-" />
        </View>
        <View style={{flex: 4}}>
          <Text>History</Text>
          <FlatList data={this.state.data} 
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
