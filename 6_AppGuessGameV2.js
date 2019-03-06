import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, AsyncStorage } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= { x: 0, input: '', output: '', index: 0, highScore: 0 }
  }

  componentDidMount() {
    this.setX();
    this.getHighScore();
  }

  setX = () => {
    this.setState({ x: Number(Math.floor(Math.random() * 100) + 1) });
  }

  getHighScore = async () => {
    try {
      let oldHighScore = await AsyncStorage.getItem('highScore');
      if (oldHighScore === null) {
        this.setState({ highScore: 1000 });
      } else {
        this.setState({ highScore: oldHighScore });
      }
    } catch (error) {
      Alert.alert('Error reading data');
    }
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
      this.checkHighScore(i);
      this.setX();
      this.setState({ input: '', output: '', index: 0 });
    }
  }

  checkHighScore = async (newScore) => {
    let currentHighScore = this.state.highScore;
    if (newScore < currentHighScore) {
      this.setState({ highScore: newScore });
      try {
        await AsyncStorage.setItem('highScore', JSON.stringify(newScore));
        } catch(error) {
          Alert.alert('Error saving data');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>Guess a number between 1-100</Text>
        <Text>Generated number: {this.state.x}</Text>
        <Text>Attempts so far: {this.state.index}</Text>
        <Text>High score: {this.state.highScore}</Text>
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
