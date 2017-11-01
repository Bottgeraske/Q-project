//demo Component
import React, {Component} from 'react';
import ReactNative from 'react-native';
const {
  View,
  Text
} = ReactNative;
import ActionButton from './ActionButton';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAlcAVowiuTK8SFOaPN42nVNuzsHrPboRE",
  authDomain: "queueme-b24c2.firebaseapp.com",
  databaseURL: "http://queueme-b24c2.firebaseio.com",
  projectId: "queueme-b24c2",
  storageBucket: "queueme-b24c2.appspot.com",
  messagingSenderId: "319175123060"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
  //random comment
];

class ComponentTest extends Component {
  constructor() {
      super();

      this.state = {
         currentTime: '00:00:00',
         demoObj: {
           title: 'This is a demo4!',
           number: 0,
         }
      }
      this.itemsRefs = this.getRef().child('items');
  }

  getRef() {
      return firebase.database().ref();
  }

  listenForItems() {
    //this works!
    let itemsRef = this.getRef().child('items');
    //but should work like this:
    //let itemsRef = this.itemsRef;
    //and when this works, the itemsRef shoudl be taken directly from constructor.
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          number: child.val().number,
          _key: child.key
        });
      });

    });
  }

  //standard metode til at kalde metoder efte mount.
  componentDidMount() {
    this.updateTime();
    let test = this;
    this.listenForItems();
  }

  updateTime() {
    let date = new Date();
    let timeStamp = (
      date.getHours() + ':'+
      date.getMinutes() + ':' +
      date.getSeconds()
    )
    this.setState({currentTime: timeStamp})
  }

  addItem() {
    //get last number
    let currentNumber = this.itemsRefs.orderByKey().limitToLast(1).number;
    let nextNo = this.state.demoObj.number + 1;
    this.itemsRefs.push(this.state.demoObj);


    this.setState({
      demoObj: {
        title: 'this is a demo2!',
        number: nextNo
      }
    })
  }

  render() {
    return (
      <View>
        <Text>
         {this.state.currentTime};
        </Text>
        <ActionButton
          //.bind(this) binder funktionen til det her element.
          //fx vil man ikke kunne opdatere dennes state, hvis man ikke binder.
          onPress={this.updateTime.bind(this)}
          title='Opdater tid!'
          >
        </ActionButton>
        <ActionButton
          //.bind(this) binder funktionen til det her element.
          //fx vil man ikke kunne opdatere dennes state, hvis man ikke binder.
          onPress={this.addItem.bind(this)}
          title='Tilføj item!'
          >
        </ActionButton>
      </View>
    )
  }
}
module.exports = ComponentTest;
