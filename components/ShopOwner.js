import React, {Component} from 'react';
import ReactNative from 'react-native';
import ActionButton from './ActionButton';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';
const {
  View,
  Button,
  Text
} = ReactNative;

class ShopOwner extends Component {
	constructor() {
			super();
			this.state = { 
				q_current: 0,
				q_total: 0,
				q_status: 0,
				store_key: 'sfgdfgdfg'
			};
			this.storeRef = this.getRef().child('store');
			this.q_ref = this.getRef().child('store/'+this.state.store_key)
	}

	getRef() {
			return firebase.database().ref();
	}

	getCurrentQ(){
		this.storeRef.orderByKey().equalTo(this.state.store_key).on('value', (snap) => {
      let q_number = 0
      snap.forEach((child) => {
        q_number = child.val().q_current
			});
			this.setState({q_current: q_number})
    console.log('q_current', q_number);
		});
	}

	getTotalQ(){
		this.storeRef.orderByKey().equalTo(this.state.store_key).on('value', (snap) => {
      let q_number = 0
      snap.forEach((child) => {
        q_number = child.val().q_total
			});
			this.setState({q_total: q_number})
		console.log('q_total', q_number);
		});
	}

	getQStatus(){
		this.storeRef.orderByKey().equalTo(this.state.store_key).on('value', (snap) => {
      let status = 0
      snap.forEach((child) => {
        status = child.val().q_open
			});
			this.setState({q_status: status})
		console.log('q_status', status);
		});
	}

	_customerServed() {
		this.q_ref.update({q_current: this.state.q_current+1});
	}

	_open_close_Q() {
		// Updates the status of the queue
		{this.state.q_status?
			this.q_ref.update({q_open: 0}):this.q_ref.update({q_open: 1})} 
		// resets the current queue number to 0, when queue is opened
		{this.state.q_status?
		()=>{}:this.q_ref.update({q_current: 0})}
		{this.state.q_status?
			()=>{}:this.q_ref.update({q_total: 0})}
	}

	_logout(){
		Actions.Authentication();
	}

	// standard metode til at kalde metoder efte mount.
	componentDidMount() {
		this.getCurrentQ();
		this.getTotalQ();
		this.getQStatus();
	}

	render() {
		return (
			<View style={styles.form}>
				<Text style={styles.title}>ADMIN</Text>
				<Text style={styles.title}>Nuværende kønummer:</Text>
				<Text style={styles.title}>{this.state.q_current}</Text>
				<Text style={styles.title}>Antal personer i kø</Text>
				<Text style={styles.title}>{this.state.q_total}</Text>
				<View>
				{this.state.q_status?<Button onPress={this._customerServed.bind(this)} title="Kunde betjent"/>
				:<Button disabled onPress={()=>{}} title="Kunde betjent"/>}
				</View>
				<Button onPress={this._open_close_Q.bind(this)} title={this.state.q_status?"Luk Kø":"Åbn Kø"}/>
				<Button onPress={this._logout.bind(this)} title="Log ud"/>
			</View>
		)
	}
}
module.exports = ShopOwner;