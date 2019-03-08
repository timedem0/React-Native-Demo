import React from 'react';
import { Button, TextInput, View, Alert, StatusBar } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { myMapQuestKey } from './MyKeys';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= { 
      region: {
        latitude: 60.200692, 
        longitude: 24.934302, 
        latitudeDelta: 0.0322, 
        longitudeDelta: 0.0221,
      },
      address: 'Helsinki',
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permissionto accesslocation');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState( prevState => ({
        region: { 
          ...prevState.region, 
          latitude: location.coords.latitude, 
          longitude: location.coords.longitude, 
        }
      }))
    }
  };

  search = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + myMapQuestKey + '&location=' + this.state.address; 
    fetch(url) 
    .then(response => response.json()) 
    .then(responseJson => { this.setState( prevState => ({
        region: { 
          ...prevState.region, 
          latitude: responseJson.results[0].locations[0].latLng.lat, 
          longitude: responseJson.results[0].locations[0].latLng.lng, 
        }
      }))}) 
    .catch((error) => { Alert.alert(error); });    
  }

  render() {
    return (
      
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <View style={{ flex: 1 }}>
          <TextInput style={{borderColor:'gray', borderWidth:1}}
            onChangeText={(address) => this.setState({address})}
            value={this.state.address}
          />
          <Button onPress={this.search} title="SEARCH" />
        </View>
        <MapView 
          style={{ flex: 6 }} 
          initialRegion={ this.state.region } 
          region={ this.state.region }
        >
          <MapView.Marker 
            coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }} 
            title={ this.state.address }
          />
        </MapView>
      </View>
      
    );
  }
}
