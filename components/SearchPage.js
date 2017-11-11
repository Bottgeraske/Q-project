import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Modal} from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import { Dropdown } from 'react-native-material-dropdown';
import  SearchResultModal from './SearchResultModal';


const {
    View,
    Text,
    StyleSheet,
    Switch,
    TextInput,
    TouchableHighlight,
} = ReactNative;

class SearchComponent extends Component{
    constructor(props){
        super();
        this.state = {
            isOpenSelected: false,
            shortQueueSelected: false,
            selectedCategory: null,
            shortDistanceSelected: false,
            searchString: '',
            modalVisible: false,
          //Todo: currentPos should probably be updated when switching on shortDistance, but this results in async errors
            currentPos: this.updateCurrentPosition(),
            stores: this.getStores(null, false, false),
        };
    }
    updateSelectedCategory = (value) => {
        if(value === ""){
            this.setState({selectedCategory: null})
            return
        }
        this.setState({selectedCategory: value})
    }

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    getStoresRef(){
        return firebase.database().ref("store/")
    }

    snapshotToArray(snapshot){
        var returnArr = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item)

        });
        return returnArr
    }



    getStores(Category, isShortDistance, isShortQueue){
        console.log('Call to getStores')
        let storesRef = this.getStoresRef();
        let ticketRef = firebase.database().ref('ticket')

        let stores = [];


        //If category is selected, filter database on selected category and save to stores
        if(Category !== null){

            storesRef.orderByChild('category').equalTo(Category).on('value', (snapshot) => {
                stores = this.snapshotToArray(snapshot);
                console.log('category filter', stores)

            }), function (error) {
                console.log("Error: " + error.code);
            };
        }

        //No category selected. Get all stores and save them in stores
        else {
            storesRef.orderByKey().on('value', (snapshot) => {
                stores = this.snapshotToArray(snapshot)
            });
        }


        //If shortqueue is selected then apply shortqueuefilter to stores
        if(isShortQueue){
            stores = stores.filter(applyShortQueueFilter)
        }

        // if shortdistance is selected then apply short distance filter
        if(isShortDistance){
            stores = stores.filter(applyShortDistanceFilter, this)
        }

        return stores;


        //For each store_key, find out how many tickets have a reference to this store.
        //Then filter the tickets based on whether they are active or not.
        //Push the store if the amount of active tickets are < 5.
        function applyShortQueueFilter(store) {
            let activeTickets = 0;
            ticketRef.orderByChild('store_key').equalTo(store.key).on('value', (snapshot) => {
                activeTickets = 0;

                //For each ticket, check if it is active
                snapshot.forEach((child) => {
                    if(child.val().is_active){
                        activeTickets ++;
                    }
                })
            })
            return activeTickets < 5
        }

        function applyShortDistanceFilter(store) {

            let currentPos = this.state.currentPos
            let storePos = store.coordinates;

            console.log(currentPos)

            let distance = distanceInKmBetweenEarthCoordinates(currentPos.latitude, currentPos.longitude, storePos.latitude, storePos.longitude)
            console.log('DISTANCE: ' , distance)

            return distance < 5
        }

        //Methods for calculating distance between 2 coordinates.
        // Code taken from: https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates#comment28165728_365853
        function degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
        }

        function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
            let earthRadiusKm = 6371;

            let dLat = degreesToRadians(lat2-lat1);
            let dLon = degreesToRadians(lon2-lon1);

            lat1 = degreesToRadians(lat1);
            lat2 = degreesToRadians(lat2);

            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return earthRadiusKm * c;
        }
    }


    updateCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(4, 'getCurrentLocation')
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            this.setState({currentPos: region});
        },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
        );
    }

    render(){
        //this.getStores(this.state.selectedCategory, this.state.shortDistanceSelected, this.state.shortQueueSelected)
        console.log('RENDER')

        return(
            <View>

                <SearchResultModal modalVisible={this.state.modalVisible} onClose={this.toggleModal} data={this.state.stores}>

                </SearchResultModal>


                <View style={styles.SearchSection}>
                    <Icon style={styles.SearchIcon} name={'magnifying-glass'} type={'entypo'} color={'#000'}/>
                    <TextInput style={styles.SearchTextInput} placeholder="Søg" onChangeText={(searchString) => {this.setState({searchString})}}/>

                </View>


                <View style={styles.SwitchContainer}>
                    <Text style={styles.SwitchLabel}>Åbent nu</Text>
                    <Switch style={styles.Switch} value={this.state.isOpenSelected} onValueChange={()=>{
                        this.state.isOpenSelected ? this.setState({isOpenSelected: false}) : this.setState({isOpenSelected: true})
                    }}/>

                </View>

                <View style={styles.SwitchContainer}>
                    <Text style={styles.SwitchLabel}>Kort kø</Text>
                    <Switch style={styles.Switch} value={this.state.shortQueueSelected} onValueChange={()=>{
                        this.state.shortQueueSelected ? this.setState({shortQueueSelected: false}) : this.setState({shortQueueSelected: true})
                    }}/>

                </View>


                <View style={styles.SwitchContainer} >
                    <Text style={styles.SwitchLabel}>Kort afstand</Text>
                    <Switch style={styles.Switch} value={this.state.shortDistanceSelected} onValueChange={()=>{
                        this.state.shortDistanceSelected ? this.setState({shortDistanceSelected: false}) : this.setState({shortDistanceSelected: true})
                    }}/>
                </View>


                <View style={styles.DropDownSection} >
                    <Text style={styles.DropDownText}>Kategori</Text>
                    <View style={styles.DropDownContainer}>
                        <Dropdown  dropdownPosition={0}  style={styles.DropdownMenu} fontSize={15}  data={[{value: ""}, {value:'drugstore'}, {value:'bank'}, {value:'stadion'}]}
                                   onChangeText={this.updateSelectedCategory.bind(this)}>
                        </Dropdown>
                    </View>
                </View>


                <View style={{padding: 40, paddingTop: '30%', backgroundColor: '#fff',}}>
                    <TouchableHighlight style={styles.TouchableHighlight} onPress={()=> {this.setState({stores: this.getStores(this.state.selectedCategory, this.state.shortDistanceSelected, this.state.shortQueueSelected), modalVisible: true, })}}>
                        <View>
                            <Text style={{padding: 5, color: '#fff'}}>Vis Resultater</Text>
                        </View>
                    </TouchableHighlight>
                </View>


                <View style={{height: '100%', backgroundColor: '#fff'}}/>



            </View>
        );
    }
}

const styles = StyleSheet.create({


    Container: {
    },

    MenuLabel: {
        padding: '2.5%',

    },

    SearchSection: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: '1%',
        borderRadius: 5,
    },

    SearchTextInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',

    },


    SearchIcon: {
      padding: 10,
    },


    SwitchContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: '2.5%',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },

    SwitchLabel: {
      flex: 1,
      lineHeight: 30,
    },

    Switch: {
      flex: 0,
    },

    DropDownSection: {
        flexDirection: 'row',
        backgroundColor: "#fff",


    },

    DropDownContainer: {
        flex: 4,
    },

    DropDownText: {
        flex: 1,
        textAlign: 'center',
        lineHeight: 80,
    },

    DropdownMenu: {

    },

    TouchableHighlight: {
        backgroundColor: '#1194f6',
        borderRadius: 5,
        alignItems: 'center',
    },
})




module.exports = SearchComponent;