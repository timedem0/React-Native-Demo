import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasCameraPermission: null, type: Camera.Constants.Type.back, ratio: "1:1", photoName: '', photoBase64:'' }
    this.camera = React.createRef();
  }

  componentDidMount() {
    this.askCameraPermission();
  }
  
  askCameraPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.current.takePictureAsync({ base64:true });
      this.setState({ photoName:photo.uri, photoBase64:photo.base64 });
    }
  };

  render() {
    if (this.state.hasCameraPermission == null) {
      return <View />;
    } else if (this.state.hasCameraPermission == false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex:1 }}>
          <Camera style={{ flex:2 }} ref={this.camera} type={this.state.type} ratio={this.state.ratio} />
          <View>
            <Button title="TakePhoto" onPress={this.snap} />
          </View>
          <View style={{ flex:2 }}>
            <Image style={{ flex:1 }} 
              source={{ uri: this.state.photoName }} />
            <Image style={{ flex:1 }} 
              source={{ uri: `data:image/gif;base64,${this.state.photoBase64}` }} />
          </View>
        </View>
      );
    }
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
