import React, {Component} from 'react';
import ReactNative from 'react-native';
const {
    View,
    Dimensions,
    Modal,
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
            pharmacies: [
                {
                    key: 'F1',
                    type: 'farmacia',
                    title: 'Farmacia de Trianglen',
                    description: 'Me gusta las Farmacia de Dinamarka',
                    coordinates: {
                        latitude: 55.7000354,
                        longitude: 12.57803100000001
                    },
                    openingHours: [
                        {
                            day: 'M',
                            hours: '10 - 19',
                            value: 30,
                        },
                        {
                            day: 'T',
                            hours: '10 - 19',
                            value: 40,
                        },
                        {
                            day: 'O',
                            hours: '10 - 19',
                            value: 50,
                        },
                        {
                            day: 'T',
                            hours: '10 - 19',
                            value: 60,
                        },
                        {
                            day: 'F',
                            hours: '10 - 19',
                            value: 60,
                        },
                        {
                            day: 'L',
                            hours: '10 - 19',
                            value: 20,
                        },
                        {
                            day: 'S',
                            hours: '10 - 19',
                            value: 30,
                        }
                    ]
                },
                {
                    key: 'F2',
                    type: 'farmacia',
                    title: 'Farmacia de Østerbrogade',
                    description: 'También me gusta esta farmacia',
                    coordinates: {
                        latitude: 55.7094258,
                        longitude: 12.577164799999991
                    },
                    openingHours: [
                        {
                            day: 'M',
                            hours: '10 - 19',
                            value: 30,
                        },
                        {
                            day: 'T',
                            hours: '10 - 19',
                            value: 40,
                        },
                        {
                            day: 'O',
                            hours: '10 - 19',
                            value: 50,
                        },
                        {
                            day: 'T',
                            hours: '10 - 19',
                            value: 60,
                        },
                        {
                            day: 'F',
                            hours: '10 - 19',
                            value: 60,
                        },
                        {
                            day: 'L',
                            hours: '10 - 19',
                            value: 20,
                        },
                        {
                            day: 'S',
                            hours: '10 - 19',
                            value: 30,
                        }
                    ]
                }
            ],
            modalVisible: false,
            /*region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.00922*0.5,
                longitudeDelta: 0.00421*0.5
            },*/
        }
    }

    componentDidMount() {
        this.getAllStores((stores) => {
            this.setState({allStores:stores})
        });
        this.getDemoCustomer();

    }

    getAllStores(cb) {
        let _stores = []
        this.storesRef.orderByKey().on('child_added', (stores) => {
            let store = stores.val();
            store._key = stores.key;
            console.log(stores.key);
            console.log(store);
            _stores.push(store);
            cb(_stores)
        });
    }

    getDemoCustomer() {
        this.customersRef.limitToFirst(1).once('child_added', (customer) => {
            let _customer = customer.val();
            _customer.key = customer.key;
            this.setState({customer:_customer});
        })

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
        this.ticketsRef.orderByKey().limitToLast(1).once('child_added', (ticket) => {
            let latestNumber = ticket.val().q_number;
            this.ticketsRef.push({
                storeKey: store._key,
                customerKey: this.state.customer.key,
                q_number: latestNumber+1
            });
            alert('You are now in line at '+store.title+' with ticket number '+(latestNumber+1))

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
                        return(
                            <MapView.Marker
                                style={{padding:20}}
                                coordinate={store.coordinates}
                            >
                                <MapView.Callout>
                                    <View>
                                        <Text
                                            style={{fontSize:20, textAlign: 'center' }}
                                        >
                                            {store.title}
                                        </Text>
                                        <Text style={{color: 'grey'}}
                                        >
                                            {store.description}
                                        </Text>
                                        <View
                                            style={styles.openingHoursContainer}
                                        >
                                            {store.openingHours.map((day) => {
                                                return(
                                                    <View style={styles.openingHours}>
                                                        <View style={[styles.hoursColumn, {height: day['value']} ]}/>
                                                        <Text style={{textAlign:'center'}}>{day.day}</Text>
                                                    </View>
                                                )
                                            })}

                                        </View>
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.drawTicket(store);
                                            }}
                                            style={styles.drawTicketButton}
                                        >
                                            <Text style={styles.drawTicketText}>
                                                Stil dig i fucking kø
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
        height:100,
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
    },
    drawTicketText: {
        padding:10,
    }




};

module.exports = MapsPage;