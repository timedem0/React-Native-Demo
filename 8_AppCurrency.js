import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker, Alert, StatusBar } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {query: [], currencies: [], sum: 0, currency: '', result: 0};
  }

  componentDidMount = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=____________________&symbols=USD,SEK,RON';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({query: responseJson});
        this.setState({currencies: ['', ...Object.keys(this.state.query.rates)]});
      })
      .catch((error) => { 
        Alert.alert(error); 
      });
  }

  getResult = () => {
    if (this.state.currency === '') {
      Alert.alert('Please choose currency!');
    } else {
      const result = (this.state.sum / this.state.query.rates[this.state.currency]).toFixed(2);
      this.setState({result});
    }
  }

  // 9e19b7f933047b8d6ee7298d42e8188f
  // console.warn() 

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text
          style={{fontSize: 26}}>
          {this.state.result} €
        </Text>
        <TextInput 
          style={{fontSize: 18, width: 100, borderColor:'gray', borderWidth:1}} 
          keyboardType='numeric'
          placeholder='sum'
          onChangeText={(sum) => this.setState({sum})} />
        <Picker
          style={{height: 50, width: 100}}
          mode="dropdown"
          selectedValue={this.state.currency}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({currency: itemValue})
          }>
            {this.state.currencies.map((key) => {
              return <Picker.Item label={key} value={key} key={key} />}
            )}
        </Picker>
        <Button title="Convert" onPress={this.getResult} />
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
    marginTop: '10%',
  },
});
