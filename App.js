/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Drawer, Router, Scene, Tabs, Switch} from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import ComponentTest from './components/ComponentTest';
import ShopOwner from './components/ShopOwner';
import Authentication from './components/Authentication';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyAfMjADzM6r46ev4ZJeQajH1vIwMbE2OjE",
  authDomain: "qmedb-c80b4.firebaseapp.com",
  databaseURL: "https://qmedb-c80b4.firebaseio.com",
  projectId: "qmedb-c80b4",
  storageBucket: "qmedb-c80b4.appspot.com",
  messagingSenderId: "971194801614"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const MenuIcon = () => {
  return (
    <Icon
    name='menu'
    type='material-community'
    color='#333333' />
  );
}

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
              key="MapTab"
              title="map-marker"
              icon={TabIcon}
              >
              <Scene
                key="MapPage"
                title="MapPage"
                component={scene1}
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
