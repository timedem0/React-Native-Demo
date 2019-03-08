import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('coursedb.db');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: '', qty: '', shoppingList: [] };
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists ShoppingList (id integer primary key not null, product text, qty text);');
    });
    this.updateList();
  }

  saveProduct = () => {
    db.transaction(tx => {
      tx.executeSql('insert into ShoppingList (product, qty) values (?, ?)', [(this.state.product), this.state.qty]);    
    }, null, this.updateList);
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from ShoppingList', [], (_, { rows }) =>
        this.setState({ product: '', qty: '', shoppingList: rows._array })
      ); 
    });
  }

  deleteProduct = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from ShoppingList where id = ?;', [id]);
    }, null, this.updateList);    
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
          keyExtractor={item => item.id.toString()} 
          renderItem={({item}) =>
            <View style={styles.listcontainer}>
              <Text style={{fontSize: 18}}>{item.product}, {item.qty} - </Text>
              <Text style={{fontSize: 18, color: '#006400'}} onPress={() => this.deleteProduct(item.id)}>Bought</Text>
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
