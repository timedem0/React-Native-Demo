import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {inputOne: '', inputTwo: '', result: ''}
  }

  buttonPlus = () => {
    let x = Number(this.state.inputOne) + Number(this.state.inputTwo);
    this.setState({inputOne: '', inputTwo: '', result: x});
  }

  buttonMinus = () => {
    let x = Number(this.state.inputOne) - Number(this.state.inputTwo);
    this.setState({inputOne: '', inputTwo: '', result: x});
  }

  buttonClear = () => {
    this.setState({inputOne: '', inputTwo: '', result: ''});
  }

  render() {
    return (
      <View style={styles.container}>

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
        <View></View>
        <View style={{flexDirection:'row'}}>
          <Button onPress={this.buttonPlus} title="+" />
          <Button onPress={this.buttonClear} title="C" />
          <Button onPress={this.buttonMinus} title="-" />
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
