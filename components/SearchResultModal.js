import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet, FlatList, } from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

class SearchResultModal extends Component {


    constructor(props){
        super(props);
    }

    getIcon(category){

        switch (category){
            case 'drugstore':
                return (<Icon name={'heart'} type={'entypo'} color={'#000'}/>)

            case 'bank':
                return (<Icon name={'credit'} type={'entypo'} color={'#000'}/>)

            case 'stadion':
                return (<Icon name={'sports-club'} type={'entypo'} color={'#000'}/>)

            default:
                return (<Icon name={'rotate-right'} type={'FontAwesome'} color={'#000'}/>)

        }
    }

    render() {
        if(this.props.modalVisible === false){
            return null;
        }
        console.log("This.props.data", this.props.data)

        return (
            <View>
                <Modal visible={this.props.modalVisible} animationType='slide' transparent={false}>
                    <View>
                        <FlatList style={{marginTop: 40}}
                            data={this.props.data}
                            renderItem={({ item }) => (

                                <ListItem
                                    //roundAvatar
                                    // avatar={<Icon style={styles.SearchIcon} name={'magnifying-glass'} type={'entypo'} color={'#000'}/>}
                                    avatar={this.getIcon(item.category)}
                                    title={item.title}
                                    subtitle={item.description}
                                    //avatar={{ uri: item.picture.thumbnail }}
                                />
                            )}
                        />
                    </View>





                    <TouchableHighlight onPress={this.props.onClose} style={styles.Button}>
                        <Text style={{color: '#fff'}}>Back</Text>
                    </TouchableHighlight>



                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    Button: {
        height: 50,
        backgroundColor: '#1194f6',
        margin: 30,
        borderRadius: 10,
        alignItems: 'center',
        padding: 15
    },

})

module.exports = SearchResultModal;