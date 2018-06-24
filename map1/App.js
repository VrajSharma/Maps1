import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Expo from 'expo';

export default class App extends Component {
  state = {
    location: null,
  };

  _getLocationAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('LOCATION Permission Not Granted');
      return;
    }

    let location = await Expo.Location.getCurrentPositionAsync({});

    let home = (await Expo.Location.geocodeAsync('Parsi Dairy.'))[0];
    let sardar = (await Expo.Location.geocodeAsync('Tardeo Road Junction.'))[0];
    this.setState({
      location,
      places: {
        home,
        sardar,
      },
    });
    this.setState({ location });
  };
  componentDidMount() {
    this._getLocationAsync();
  }

  render() {
    if (!this.state.location) {
      return <View />;
    }
    return (
      <Expo.MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Expo.MapView.Marker
          coordinate={this.state.location.coords}
          title="You are here"
          description=""
          pinColor="blue"
        />
        <Expo.MapView.Marker
          coordinate={this.state.places.home}
          title="I am here"
          description=""
          pinColor="green"
        />
        <Expo.MapView.Marker
          coordinate={this.state.places.sardar}
          title="Lets Go here"
          description=""
          pinColor="red"
        />
      </Expo.MapView>
    );
  }
}
