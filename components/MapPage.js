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
            pharmacies: [
                {
                    type: 'farmacia',
                    title: 'Farmacia de Trianglen',
                    description: 'Me gusta las Farmacia de Dinamarka',
                    coordinates: {
                        latitude: 55.7000354,
                        longitude: 12.57803100000001
                    }
                },
                {
                    type: 'farmacia',
                    title: 'Farmacia de Østerbrogade',
                    description: 'También me gusta esta farmacia',
                    coordinates: {
                        latitude: 55.7094258,
                        longitude: 12.577164799999991
                    }
                }
            ]
            /*region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.00922*0.5,
                longitudeDelta: 0.00421*0.5
            },*/
        }
    }

    componentDidMount() {
        console.log(this.state.region);
        //this.getCurrentLocation();
        console.log(this.state.region);
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.00922*0.2,
                    longitudeDelta: 0.00421*0.2
                };
                this.onRegionChange(region);
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
        );
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
                    //Region={this.state.region}
                    onRegionChange={this.onRegionChange.bind(this)}
                >
                    {this.state.pharmacies.map((marker) => {
                        return(
                            <MapView.Marker
                                coordinate={marker.coordinates}
                                title={marker.title}
                                description={marker.description}
                            />
                        )
                    })}
                </MapView>
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