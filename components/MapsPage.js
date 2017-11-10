import React, {Component} from 'react';
import ReactNative from 'react-native';
const {
    View,
    Dimensions,
    Text,
    TouchableHighlight,} = ReactNative;
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

class MapsPage extends Component {
    constructor(props) {
        super(props);
        this.ticketsRef = firebase.database().ref().child('ticket');
        this.storesRef = firebase.database().ref().child('store');
        this.customersRef = firebase.database().ref().child('customer');
        this.state = {
            allStores: [],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.00922*0.5,
                longitudeDelta: 0.00421*0.5
            },
        }
    }

    componentDidMount() {
        this.getAllStores();
        this.getCurrentLocation();
    }

    getAllStores() {
        this.storesRef.orderByKey().once('value', (stores) => {
            let _stores = [];
            stores.forEach((store) => {
                store._key = store.key;
                _stores.push(store);
            });
            this.setState({allStores: _stores});
        });
    }

    getStoreQueue(storeKey){
        console.log(2, storeKey);
        let activePeople = 0;
        this.ticketsRef.orderByChild('storeKey').equalTo(storeKey).on('value', (tickets) => {
            tickets.forEach((ticket) => {
                console.log(1, ticket);
                if (ticket.val().isActive) {
                    activePeople++
                }
            });
        });
        return activePeople
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

    drawTicket(store) {
        console.log(5, store);
        console.table(this.state.allStores)
        this.ticketsRef.orderByKey().limitToLast(1).once('child_added', (ticket) => {
            let latestNumber = ticket.val().ticketNumber;
            this.ticketsRef.push({
                storeKey: store._key,
                customerKey: this.props.customer.key,
                ticketNumber: latestNumber+1,
                isActive: 1
            });
            alert('You are now in line at '+store.name+' with ticket number '+(latestNumber+1))
            //work-around to update current queue
            this.setState(this.state);
        });
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
                    {this.state.allStores.map((store) => {
                        let _store = store.val();
                        return(
                            <MapView.Marker
                                style={{padding:20}}
                                coordinate={_store.coordinates}
                            >
                                <MapView.Callout>
                                    <View>
                                        <Text
                                            style={{fontSize:20, textAlign: 'center' }}
                                        >
                                            {_store.name}
                                        </Text>
                                        <Text style={{color: 'grey'}}
                                        >
                                            {_store.description}
                                        </Text>
                                        <View
                                            style={styles.openingHoursContainer}
                                        >
                                            {_store.openingHours.map((day) => {
                                                return(
                                                    <View style={styles.openingHours}>
                                                        <View style={[styles.hoursColumn, {height: day['value']} ]}/>
                                                        <Text style={{textAlign:'center'}}>{day.day}</Text>
                                                    </View>
                                                )
                                            })}


                                        </View>
                                        <Text style={styles.calloutQueue}>
                                            {this.getStoreQueue(store._key)} personer i kø
                                        </Text>

                                        <TouchableHighlight
                                            onPress={() => {
                                                this.drawTicket(store);
                                            }}
                                            style={styles.drawTicketButton}
                                        >
                                            <Text style={styles.drawTicketText}>
                                                Stil dig i kø
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                </MapView.Callout>
                            </MapView.Marker>
                        )
                    })}
                </MapView>
            </View>
        )
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
    },
    openingHoursContainer: {
        position: 'relative',
        width:'100%',
        display:'flex',
        flexDirection:'row',
        height:80,
        alignItems: 'baseline',
        marginTop: 20,
    },
    openingHours: {
        flex:1,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    hoursColumn: {
        width:20,
        backgroundColor: '#7ba9f7',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    drawTicketButton: {
        alignItems: 'center',
        backgroundColor: '#7ba9f7',
        borderRadius: 10,
        marginTop: 10,
    },
    drawTicketText: {
        padding:10,
    },
    calloutQueue: {
        margin: 10,
    }




};

module.exports = MapsPage;