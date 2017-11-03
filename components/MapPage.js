import React, {Component} from 'react';
import ReactNative from 'react-native';
import MapView from 'react-native-maps';
const {
    View,
    Dimensions,
    Modal,
    Text,
    TouchableHighlight
} = ReactNative;

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
                {/*<Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight onPress={() => {
                                this.setState({modalVisible:false})
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>*/}
                <MapView
                    //minZoomLevel={10}
                    style = {styles.map}
                    showsUserLocation={true}
                    //Region={this.state.region}
                    onRegionChange={this.onRegionChange.bind(this)}
                >
                    {this.state.pharmacies.map((pharmacy) => {
                        return(
                            <MapView.Marker
                                style={{padding:20}}
                                coordinate={pharmacy.coordinates}
                                //title={pharmacy.title}
                                //description={pharmacy.description}
                                //onPress={() => this.setState({modalVisible:true})}
                                //popover={PopoverElement}
                                //onPress={popover.showPopper.bind(this)}
                            >
                                <MapView.Callout>
                                    <View
                                        style={{
                                        }}
                                    >
                                        <Text
                                            style={{fontSize:20, textAlign: 'center' }}
                                            >
                                            {pharmacy.title}
                                        </Text>
                                        <Text style={{color: 'grey'}}
                                            >
                                            {pharmacy.description}
                                        </Text>
                                        <View
                                            style={styles.openingHoursContainer}
                                            >
                                            {pharmacy.openingHours.map((day) => {
                                                return(
                                                    <View style={styles.openingHours}>
                                                        <View style={[styles.hoursColumn, {height: day['value']} ]}/>
                                                        <Text style={{textAlign:'center'}}>{day.day}</Text>
                                                    </View>

                                                )
                                            })}

                                        </View>
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
    }




};

module.exports = MapPage;