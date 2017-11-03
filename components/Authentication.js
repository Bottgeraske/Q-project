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

  shopOwner_login() {
    Actions.ShopOwner();
  }

  render() {
		return (
			<View style={styles.form}>
				<Text style={styles.title}>Log ind som kunde</Text>
        <Button onPress={this.customer_login.bind(this)} title="Login"/>
				<Text style={styles.title}>Log ind som forretningsejer</Text>
        <Button title="Login" onPress={this.shopOwner_login.bind(this)}/>
			</View>
		)
	}

};
module.exports = Authentication;