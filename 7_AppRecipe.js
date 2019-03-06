import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, StatusBar, Image } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { query: [], ingredient: '', };
  }

  getDishes = () => { 
    const url = `http://www.recipepuppy.com/api/?i=${this.state.ingredient}&q=`; 
    fetch(url) 
    .then((response) => response.json()) 
    .then((responseJson) => { this.setState({ query: responseJson.results }); }) 
    .catch((error) => { Alert.alert(error); });
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  }

  render() {

    return (

      <View style={styles.container}>

        <StatusBar hidden={true} />
 
        <TextInput style={{fontSize: 18, width: 200, borderColor:'gray', borderWidth:1}} 
          value={this.state.ingredient} 
          placeholder='ingredient'
          onChangeText={(ingredient) => this.setState({ingredient})} />
        <Button title="Find" onPress={this.getDishes} />

        <FlatList style={{marginLeft : "5%"}} 
          keyExtractor={ item => item.title } 
          renderItem={({ item }) => 
              <View>
              <Text>{ item.title }</Text>

              <Image style={{width:50, height: 50}} 
              source={{uri: item.thumbnail}} />
              </View>
          } 
          data={this.state.query}
          ItemSeparatorComponent={this.listSeparator}
        />

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