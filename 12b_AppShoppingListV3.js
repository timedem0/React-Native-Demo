import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Alert } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from './MyKeys';

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { product: '', qty: '', shoppingList: [] };
  }

  componentDidMount() {
    firebase.database().ref('shoppingList/').on('value', snapshot => {
      const data = snapshot.val();
      const items = Object.values(data);
      this.setState({ shoppingList: items });
    });
  }

  saveProduct = () => {
    firebase.database().ref('shoppingList/').push(
      { 'product': this.state.product, 'qty': this.state.qty }
    );
    this.setState({ product: '', qty: '' });
  }

  render() {
    return (  
      <View style={styles.container}>
        <TextInput placeholder='Product' style={{ marginTop: 100, fontSize: 18, width: 150, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(product) => this.setState({product})}
          value={this.state.product} />  
        <TextInput placeholder='Quantity' style={{ marginTop: 10, marginBottom: 10,  fontSize:18, width:150, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(qty) => this.setState({qty})}
          value={this.state.qty} />      
        <Button onPress={this.saveProduct} title="Add Product" /> 
        <Text style={{marginTop: 30, fontSize: 20}}>My Shopping List</Text>
        <FlatList 
          style={{marginLeft: "5%"}}
          keyExtractor={item => item.product.toString()} 
          renderItem={({item}) =>
            <View style={styles.listcontainer}>
              <Text style={{fontSize: 18}}>{item.product}, {item.qty}</Text>
            </View>
          }
          data={this.state.shoppingList}
        />      
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listcontainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }  
});
