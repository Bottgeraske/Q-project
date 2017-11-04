import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';

class SearchResultModal extends Component {


    constructor(props){
        super(props);
    }

    render() {
        if(this.props.modalVisible === false){
            return null;
        }

        return (
            <View>
                <Modal visible={this.props.modalVisible} animationType='slide' transparent={false}>
                    <Text style={{marginTop: 50}}>What up</Text>
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