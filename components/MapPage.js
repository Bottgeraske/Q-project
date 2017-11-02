import React, {Component} from 'react';
import ReactNative from 'react-native';
const {
    View,
    Text
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
            }
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

    render() {
        return (
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
        )
    }
}

module.exports = MapPage;