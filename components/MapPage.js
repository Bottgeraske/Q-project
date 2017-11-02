import React, {Component} from 'react';
import ReactNative from 'react-native';
import { Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
const {
    View,
    Text,
    Dimensions
} = ReactNative;
import ActionButton from './ActionButton';
import * as firebase from 'firebase';

class MapPage extends Component {
    constructor() {
        super();
        this.state = {
            currentPosition: {
                lat: 0,
                long: 0,
            },
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.00922*0.5,
                longitudeDelta: 0.00421*0.5
            },
        }
    }

    getCurrentLocation() {
        console.log('getCurrentLocation is run');
        console.log(navigator);
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(
            (position) => {
            console.log('success');
            console.log(position);
            this.setState({
                currentPosition: {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                }
            }),
            (error) => {
                console.log('err0r');
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        })

    }

    getInitialState() {
        return {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style = {styles.preview}>
                <MapView
                    //minZoomLevel={10}
                    style = {styles.map}
                    showsUserLocation={true}
                    Region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    //onRegionChange={this.onRegionChange.bind(this)}
                />
            </View>
        )
            /*
            <View>
                <Text>
                    CurrentPosition: {this.state.currentPosition.lat}, {this.state.currentPosition.long}
                </Text>
                <ActionButton
                    title='getLocation'
                    onPress={this.getCurrentLocation.bind(this)}
                    >

                </ActionButton>
            </View>
        )*/
    }
}

const styles = {
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
};

module.exports = MapPage;