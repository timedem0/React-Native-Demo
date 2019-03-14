import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import { firebaseConfig } from '../MyKeys';

firebase.initializeApp(firebaseConfig);

export default class MyPlaces extends React.Component {

  constructor(props) {
    super(props);
    this.state = { address: '', addressBook: [] };
  }

  static navigationOptions = { title: 'My Places' };

  componentDidMount() {
    firebase.database().ref('addressBook/').on('value', snapshot => {
      const data = snapshot.val();
      const items = Object.values(data);
      this.setState({ addressBook: items });
    });
  }

  saveNewAddress = () => {
    firebase.database().ref('addressBook/').push(
      { 'address': this.state.address }
    );
    this.setState({ address: '' });
    Keyboard.dismiss();
  }

  deleteAddress = (item) => {
    firebase.database().ref('addressBook/').once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        var childKey = childSnapshot.key;
        var childVal = childSnapshot.val();
        if (childVal.address == item.address) {
          firebase.database().ref('addressBook/' + childKey).remove();
        }
      })
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View>
          <StatusBar hidden={ true } />
          <View style={ styles.container }>
            <View style={ styles.formitem }>
              <Input label='Address Book' placeholder='Type in the address'
                onChangeText={ (address) => this.setState({ address }) }
                value={ this.state.address } />
            </View>
            <View style={ styles.formitem }>  
              <Button
                icon={{ name: 'save', color: 'white' }}
                onPress={ this.saveNewAddress } title="Add Address" />
            </View>
          </View>
          <View style={ styles.container }>
            <View style={ styles.list }>
              <FlatList 
                keyExtractor={ item => item.address.toString() } 
                renderItem={ ({item}) =>
                  <View>
                    <ListItem
                      title={ item.address }
                      rightIcon={{ name: 'arrow-forward' }}
                      bottomDivider
                      onPress={ () => navigate('Map', { data: item.address }) }
                      onLongPress={ () => this.deleteAddress(item )}
                    />
                  </View>
                }
                data={ this.state.addressBook }
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formitem: {
    marginTop: 20,
    width: '70%',
  },
  list: {
    marginTop: 20,
    width: '50%',
  } 
});
