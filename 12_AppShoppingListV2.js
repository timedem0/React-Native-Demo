import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { Input, Button } from 'react-native-elements';
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
        <View style={{ marginTop: 400, width: 200 }}>
          <Input label='Product' placeholder='Enter a product' 
            onChangeText={(product) => this.setState({product})}
            value={this.state.product} />
        </View>
        <View style={{ marginTop: 30, width: 200 }}>
          <Input label='Quantity' placeholder='Enter quantity' 
            onChangeText={(qty) => this.setState({qty})}
            value={this.state.qty} />
        </View> 
        <View style={{ marginTop: 40, width: 200 }}>  
          <Button icon={{ name: 'save', color: 'white' }} onPress={this.saveProduct} title="Add Product" />
        </View> 
        <View> 
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
