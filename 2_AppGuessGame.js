import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {x: Number(Math.floor(Math.random() * 100) + 1), input: '', output: '', index: 0}
  }

  buttonGuess = () => {
    let y = this.state.input;
    let i = this.state.index + 1;
    if (this.state.x > y) {
      this.setState({input: '', output: `Your guess ${y} is too low`, index: i});
    } else if (this.state.x < y) {
      this.setState({input: '', output: `Your guess ${y} is too high`, index: i});
    } else {
      Alert.alert(`You guessed the number ${this.state.x} after ${i} tries!`);
      this.setState({x: Number(Math.floor(Math.random() * 100) + 1), input: '', output: '', index: 0});
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>Guess a number between 1-100</Text>
        <Text>Generated number: {this.state.x}</Text>
        <Text>Attempts so far: {this.state.index}</Text>
        <Text>{this.state.output}</Text>
        <TextInput style={{width:100, borderColor:'gray', borderWidth:1}}
          keyboardType='numeric'
          maxLength={100}
          onChangeText={(input) => this.setState({input})}
          value={this.state.input}
        />

        <View style={{flexDirection:'row'}}>
          <Button onPress={this.buttonGuess} title="MAKE GUESS" />
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
