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
      admin_store_key: 0
    };
    this.adminRef = this.getRef().child('admin');
  }

  getRef() {
    return firebase.database().ref();
  } 

  getAdminStore(email, cb) {
    this.adminRef.orderByChild('email')
      .equalTo(email)
      .once('child_added', (child) => {
        cb(child.val().storeKey);
    });
  }

  customer_login() {
    Actions.Tabbar();
  }

  østerbro_login() {
    this.getAdminStore('admin1@gmail.com', (storeKey) => {
      Actions.ShopOwner({text: storeKey});
    })
  }

  trianglen_login() {
    this.getAdminStore('admin2@gmail.com', (storeKey) => {
      Actions.ShopOwner({text: storeKey});
    })
  }

  render() {
		return (
			<View style={styles.form}>
        <Text style={styles.title}>WELCOME TO QME!</Text>
				<Text style={styles.title}>Log in as customer</Text>
        <Button onPress={this.customer_login.bind(this)} title="Login"/>
				<Text style={styles.title}>Log in as admin (Østerbrogade)</Text>
        <Button title="Login" onPress={this.østerbro_login.bind(this)}/>
        <Text style={styles.title}>Login as admin (Trianglen)</Text>
        <Button title="Login" onPress={this.trianglen_login.bind(this)}/>
			</View>
		)
	}

};
module.exports = Authentication;