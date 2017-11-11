/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Router, Scene, Tabs, Switch} from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import ShopOwner from './components/ShopOwner';
import Authentication from './components/Authentication';
import SearchPage from './components/SearchPage'
import MapsPage from './components/MapsPage'
import AccountPage from './components/AccountPage'
import QueueView from './components/QueueView'

import {
  StyleSheet,
  Text,
} from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyA-xu1UtsOBmkGDG2wuzNe2-WA6YrcASYA",
    authDomain: "testdemo-20978.firebaseapp.com",
    databaseURL: "https://testdemo-20978.firebaseio.com",
    projectId: "testdemo-20978",
    storageBucket: "testdemo-20978.appspot.com",
    messagingSenderId: "410211494997"
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

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.disableYellowBox = true;
      //resetDB();

    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
            <Scene
                component={Authentication}
                key='Authentication'
                title='Authentication'
          />
          <Scene
            component={ShopOwner}
            key='ShopOwner'
            title='ShopOwner'
          />
          <Tabs
            key='Tabbar'
            swipeEnabled
            showLabel={false}
            tabs={true}
            tabBarPosition='bottom'
            tabBarStyle={{ backgroundColor: '#FFFFFF' }}
            >
            <Scene
                key="SearchTab"
                title="search"
                icon={TabIcon}
                type='ionicons'
            >
              <Scene
                  key="SearchPage"
                  title="SearchPage"
                  component={SearchPage}
              />
            </Scene>
            <Scene
              key="MapTab"
              title="map-marker"
              icon={TabIcon}
              >
              <Scene
                key="MapPage"
                title="MapPage"
                component={MapsPage}
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
                component={QueueView}
                />
            </Scene>
            <Scene
              key="AccountTab"
              title="account"
              icon={TabIcon}
              >
              <Scene
                component={AccountPage}
                key="AccountPage"
                title="AccountPage"
                />
            </Scene>
          </Tabs>
        </Scene>
      </Router>
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

    let customerKey1 = null;

    const initStores = [
        {
            category: 'stadion',
            name: 'Stadion de Trianglen',
            description: 'Me gusta las stadione de Dinamarka',
            coordinates: {
                latitude: 55.7000354,
                longitude: 12.57803100000001
            },
            isOpen: true,
            currentNumber: 0,
            totalNumber: 0,
            phoneNumber: 88888888,
            openingHours: [
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
        },
        {
            category: 'bank',
            name: 'Los bankos de Trianglen',
            description: 'Me gusta las bankos de Dinamarka',
            coordinates: {
                latitude: 55.7000354,
                longitude: 12.57803100000001
            },
            isOpen: true,
            currentNumber: 0,
            totalNumber: 0,
            phoneNumber: 88888888,
            openingHours: [
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
        },
        {
            category: 'drugstore',
            name: 'Farmacia de Trianglen',
            description: 'Me gusta las Farmacia de Dinamarka',
            coordinates: {
                latitude: 55.7000354,
                longitude: 12.57803100000001
            },
            isOpen: true,
            currentNumber: 0,
            totalNumber: 0,
            phoneNumber: 88888888,
            openingHours: [
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
        },
        {
            category: 'drugstore',
            name: 'Farmacia de Østerbrogade',
            description: 'También me gusta esta farmacia',
            coordinates: {
                latitude: 55.7094258,
                longitude: 12.577164799999991
            },
            isOpen: true,
            currentNumber: 0,
            totalNumber: 0,
            phoneNumber: 88888888,
            openingHours: [
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
        //initOpeningHours.forEach((opening) => {
        //    storeRef.child(key).child('openingHours').push(opening);
        //})
    });
    initCustomers.forEach((customer) => {
        customerKey1 = customerRef.push(customer).key;
    })
    //get specific stores
    storeRef.orderByChild('name').equalTo('Farmacia de Trianglen').once('child_added', (child) => {
        storeKey1 = child.key
    });
    storeRef.orderByChild('name').equalTo('Farmacia de Østerbrogade').once('child_added', (child) => {
        storeKey2 = child.key
    });

    const initTicket = {
        ticketNumber: 1,
        storeKey: storeKey1,
        customerKey: customerKey1,
        isActive: 1
    }

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
    });

    ticketRef.push(initTicket);

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
