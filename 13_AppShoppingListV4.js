import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { Input, Button, Header, ListItem } from 'react-native-elements';
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

  deleteProduct = (item) => {
    firebase.database().ref('shoppingList/').once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        var childKey = childSnapshot.key;
        var childVal = childSnapshot.val();
        if (childVal.product == item.product) {
          firebase.database().ref('shoppingList/' + childKey).remove();
        }
      })
    });
  }
  
  render() {
    return (  
      <View>
        <Header
          centerComponent={{ text: 'FIREBASE SHOPPING LIST', style: { color: '#fff' } }}
          backgroundColor='#df8136'
        />
        <View style={ styles.container }>
          <View style={ styles.formitem }>
            <Input label='Product' placeholder='Enter a product'
              onChangeText={(product) => this.setState({product})}
              value={this.state.product} />
          </View>
          <View style={ styles.formitem }>
            <Input label='Quantity' placeholder='Enter quantity' keyboardType='numeric'
              onChangeText={(qty) => this.setState({qty})}
              value={this.state.qty} />
          </View>
          <View style={ styles.formitem }>  
            <Button
              icon={{ name: 'save', color: 'white' }}
              onPress={this.saveProduct} title="Add Product" /> 
          </View>
        </View>
        <View style={ styles.container }>
          <View style={ styles.list }>
            <FlatList 
              keyExtractor={item => item.product.toString()} 
              renderItem={({item}) =>
                <View>
                  <ListItem
                    title={item.product}
                    subtitle={item.qty}
                    rightIcon={{ name: 'arrow-forward' }}
                    bottomDivider
                    onLongPress={() => this.deleteProduct(item)}
                  />
                </View>
              }
              data={this.state.shoppingList}
            />
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formitem: {
    marginTop: 30,
    width: '70%',
  },
  list: {
    marginTop: 30,
    width: '50%',
  } 
});
