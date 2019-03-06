import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state= {inputOne: '', inputTwo: '', result: '', data: []};
  }

  static navigationOptions = {title: 'Calculator'};

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

    const { navigate } = this.props.navigation;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 70}}>

        <View style={{flex: 1}}>
          <Text>Result: {this.state.result}</Text>
          <TextInput style={{width:100, borderColor:'gray', borderWidth:1}}
            keyboardType='numeric'
            onChangeText={(inputOne) => this.setState({inputOne})}
            value={this.state.inputOne}
          />
          <TextInput style={{width:100, borderColor:'gray', borderWidth:1}}
            keyboardType='numeric'
            onChangeText={(inputTwo) => this.setState({inputTwo})}
            value={this.state.inputTwo}
          />
        </View>

        <View style={{flex: 2, width: 220, flexDirection:'row', alignItems: 'flex-start', justifyContent: 'space-around', padding: 20}}>
          <Button onPress={this.buttonPlus} title="+" />
          <Button onPress={this.buttonClear} title="C" />
          <Button onPress={this.buttonMinus} title="-" />
          <Button onPress={() => navigate('History', {data: this.state.data})} title="History" />
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
