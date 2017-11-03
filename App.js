/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Drawer, Router, Scene, Tabs, Switch} from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import ComponentTest from './components/ComponentTest';
import MapPage from './components/MapPage';
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
];


const TabIcon = ({ focused, title, type }) => {
  return (
    <Icon
      name={title}
      type={type || 'material-community'}
      color={focused ? '#333333' : '#c0c0c0'} />
  );
}

const scene1 = (props) => {
  return (
    <Text>
      Hej Morten og Kapper!! FUCK
    </Text>
  );
}

const scene2 = (props) => {
  return (
    <Text>
      To get started, edit index.ios.js
    </Text>
  );
}

export default class App extends Component {
  render() {
    //resetDB();
    return (
      <Router>
        <Scene
          key="root"
          hideNavBar={true}
          >
          <Tabs
            key='Tabbar'
            swipeEnabled
            showLabel={false}
            tabs={true}
            tabBarPosition='bottom'
            tabBarStyle={{ backgroundColor: '#FFFFFF' }}
            >
            <Scene
              key="MapTab"
              title="map-marker"
              icon={TabIcon}
              >
              <Scene
                key="MapPage"
                title="Map Page"
                userKey='user'
                component={MapPage}
                />
            </Scene>
            <Scene
              key="SearchTab"
              title="search"
              icon={TabIcon}
              type='ionicons'
              >
              <Scene
                key="SearchPage"
                title="SearchPage"
                component={scene2}
                />
            </Scene>
            <Scene
              key="QueueTab"
              title="queue"
              icon={TabIcon}
              type='material-icons'
              >
              <Scene
                key="QueuePage"
                title="QueuePage"
                component={scene2}
                />
            </Scene>
            <Scene
              key="AccountTab"
              title="account"
              icon={TabIcon}
              >
              <Scene
                key="AccountPage"
                title="AccountPage"
                component={ComponentTest}
                />
            </Scene>
          </Tabs>
        </Scene>
      </Router>
      //<View style={styles.container}>
      //  <Text style={styles.welcome}>
      //    Welcome to React Native!
      //  </Text>
      //  <Text style={styles.instructions}>
      //    To get started, edit App.js
      //  </Text>
      //  <Text style={styles.instructions}>
      //    {instructions}
      //  </Text>
      //</View>
    );
  }

}

function resetDB() {
    alert('resetDB is run');
    let dbRef = firebase.database().ref();
    let storeRef = dbRef.child('store');
    let customerRef = dbRef.child('customer');
    let ticketRef = dbRef.child('ticket');
    let adminRef = dbRef.child('admin');

    let storeKey1 = null;
    let storeKey2 = null;

    const initStores = [
        {
            key: 'F1',
            type: 'farmacia',
            title: 'Farmacia de Trianglen',
            description: 'Me gusta las Farmacia de Dinamarka',
            coordinates: {
                latitude: 55.7000354,
                longitude: 12.57803100000001
            },
            isOpen: false,
            currentNumber: 0,
            totalNumber: 0,
            phoneNumber: 88888888,
        },
        {
            key: 'F2',
            type: 'farmacia',
            title: 'Farmacia de Østerbrogade',
            description: 'También me gusta esta farmacia',
            coordinates: {
                latitude: 55.7094258,
                longitude: 12.577164799999991
            },
            isOpen: false,
            currentNumber: 0,
            totalNumber: 0,
            phoneNumber: 88888888,
        }
    ]
    const initCustomers = [
        {
            email: 'user1@gmail.com',
            password: '1234',
        },
        {
            email: 'user2@gmail.com',
            password: '1234',
        }
    ]
    const initOpeningHours = [
        {
            day: 'M',
            hours: '10 - 19',
            value: 30,
        },
        {
            day: 'T',
            hours: '10 - 19',
            value: 40,
        },
        {
            day: 'O',
            hours: '10 - 19',
            value: 50,
        },
        {
            day: 'T',
            hours: '10 - 19',
            value: 60,
        },
        {
            day: 'F',
            hours: '10 - 19',
            value: 60,
        },
        {
            day: 'L',
            hours: '10 - 19',
            value: 20,
        },
        {
            day: 'S',
            hours: '10 - 19',
            value: 30,
        }
    ]

    //clears database:
    dbRef.set({});

    initStores.forEach((store) => {
        let key = storeRef.push(store).key;
        initOpeningHours.forEach((opening) => {
          storeRef.child(key).child('openingHours').push(opening);
        })
    });
    initCustomers.forEach((customer) => {
      customerRef.push(customer);
    })
    //get specific stores
    storeRef.orderByChild('title').equalTo('Farmacia de Trianglen').once('child_added', (child) => {
      storeKey1 = child.key
    });
    storeRef.orderByChild('title').equalTo('Farmacia de Østerbrogade').once('child_added', (child) => {
        storeKey2 = child.key
    });

    const initAdmins = [
        {
            email: 'admin1@gmail.com',
            password: '1234',
            storeKey: storeKey1,
        },
        {
            email: 'admin2@gmail.com',
            password: '1234',
            storeKey: storeKey2,
        }
    ]

    initAdmins.forEach((admin) => {
      adminRef.push(admin);
    })

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
