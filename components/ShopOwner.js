import React, {Component} from 'react';
import ReactNative from 'react-native';
import ActionButton from './ActionButton';
import * as firebase from 'firebase';
const {
  View,
  Text
} = ReactNative;

// const firebaseConfig = {
//   apiKey: "AIzaSyAlcAVowiuTK8SFOaPN42nVNuzsHrPboRE",
//   authDomain: "queueme-b24c2.firebaseapp.com",
//   databaseURL: "http://queueme-b24c2.firebaseio.com",
//   projectId: "queueme-b24c2",
//   storageBucket: "queueme-b24c2.appspot.com",
//   messagingSenderId: "319175123060"
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// console.ignoredYellowBox = [
//   "Setting a timer"
// ];

class ShopOwner extends Component {
    constructor() {
      super();
      this.state = { username: 'admin', password: '123456', loading: false, error: '' };
    }
    
    render() {
        return (
          <Text>ADMIN</Text>
        )
    
    }
}
module.exports = ShopOwner;