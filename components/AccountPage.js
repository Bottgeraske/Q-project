import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';
const {
  View,
  Button,
  Text
} = ReactNative;

class AccountPage extends Component {

    _logout(){
		Actions.Authentication();
	}

    render() {
        return(
            <View>
                <Text style={styles.title}>Settings</Text>

                <Button title='Change E-mail'/>
                <Text> </Text>
                <Button title='Change Password'/>
                <Text> </Text>
                <Button title='Change Notification Settings'/>
                <Text> </Text>
                <Button onPress={this._logout.bind(this)} title='Log out'/>
            </View>
        )
    }

}

module.exports = AccountPage;