import React from 'react';
import { View, Alert, StatusBar } from 'react-native';
import { MapView } from 'expo';
import { myMapQuestKey } from '../MyKeys';

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      region: {
        latitude: 60.200692, 
        longitude: 24.934302, 
        latitudeDelta: 0.0322, 
        longitudeDelta: 0.0221,
      },
      address: 'Helsinki',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { title: navigation.getParam('data'), }
  }

  componentDidMount() {
    this.getLocation();   
  }

  getLocation() {
    const { params } = this.props.navigation.state;
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + myMapQuestKey + '&location=' + params.data; 
    fetch(url) 
    .then(response => response.json()) 
    .then(responseJson => { this.setState( prevState => ({
        region: { 
          ...prevState.region, 
          latitude: responseJson.results[0].locations[0].latLng.lat, 
          longitude: responseJson.results[0].locations[0].latLng.lng, 
        },
        address: params.data,
      }))}) 
    .catch((error) => { Alert.alert(error); }); 
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
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
