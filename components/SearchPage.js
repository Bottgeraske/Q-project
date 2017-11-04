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
        };
    }
    updateSelectedCategory = (value) => {
        this.setState({selectedCategory: value})
    };

    componentDidMount() {
        console.log('searchpage props', this.props);
    }

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }



    getData(Category, isNear, isShortQueue){
        var storesRef = firebase.database().ref('store/');
        if(Category !== null){
            storesRef.orderByChild("category").on("child_added", function(data) {
                console.log(data.val().name);
            });
        }
    }

    render(){
        this.getData(this.state.selectedCategory)

        return(
            <View>

                <SearchResultModal modalVisible={this.state.modalVisible} onClose={this.toggleModal} data={this.getData}>

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
                        <Dropdown  dropdownPosition={0}  style={styles.DropdownMenu} fontSize={15}  data={[{value:'drugstore'}, {value:'bank'}, {value:'Stadion'}]}
                                   onChangeText={this.updateSelectedCategory.bind(this)}>
                        </Dropdown>
                    </View>
                </View>


                <View style={{padding: 40, paddingTop: '30%', backgroundColor: '#fff',}}>
                    <TouchableHighlight style={styles.TouchableHighlight} onPress={()=> {this.setState({modalVisible: true})}}>
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