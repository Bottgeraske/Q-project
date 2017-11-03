import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';
const {
  Button,
  StyleSheet,
  Text,
  View,
} = ReactNative;

class Authentication extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  customer_login() {
    Actions.Tabbar();
  }

  østerbro_login() {
    Actions.ShopOwner({text: 'sfgdfgdfg'});
  }

  trianglen_login() {
    Actions.ShopOwner({text: 'inervinerv'});
  }

  render() {
		return (
			<View style={styles.form}>
				<Text style={styles.title}>Log ind som kunde</Text>
        <Button onPress={this.customer_login.bind(this)} title="Login"/>
				<Text style={styles.title}>Log in as admin (Østerbrogade</Text>
        <Button title="Login" onPress={this.østerbro_login.bind(this)}/>
        <Text style={styles.title}>Login as admin (Trianglen)</Text>
        <Button title="Login" onPress={this.trianglen_login.bind(this)}/>
			</View>
		)
	}

};
module.exports = Authentication;