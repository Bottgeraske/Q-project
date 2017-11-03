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

class ShopOwner extends Component {
	constructor(props) {
			super(props);
			this.state = { 
				q_current: 0,
				q_total: 0,
				q_status: 0,
				store_key: this.props.text,
				store_name: 0,
			};
			this.storeRef = this.getRef().child('store');
			this.q_ref = this.getRef().child('store/'+this.state.store_key)
			this.ticketRef = this.getRef().child('ticket')
	}

	getRef() {
			return firebase.database().ref();
	}

	getStoreName(){
		this.storeRef.orderByKey()
		.equalTo(this.state.store_key).on('value', (snap) => {
	  let name = ''
	  snap.forEach((child) => {
		name = child.val().name
			});
			this.setState({store_name: name})
		});
	}


	getCurrentQ(){
		this.ticketRef.orderByChild('store_key')
		.equalTo(this.state.store_key).on('value', (snap) => {
			let next_customer = 10000000000
	  snap.forEach((child) => {
				if (child.val().is_active) {
					if (next_customer > child.val().q_num) {
					next_customer = child.val().q_num
					}
				}
			});
			this.setState({q_current: next_customer})
		console.log('test', this.state.current_ticket);
		});
	}

	getTotalQ(){
		this.ticketRef.orderByChild('store_key')
		.equalTo(this.state.store_key).on('value', (snap) => {
			let q_numbers = 0
	  snap.forEach((child) => {
				if (child.val().is_active) {
					q_numbers ++
				}
				
			});
			this.setState({q_total: q_numbers})
		console.log('total_q:', q_numbers);
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
		this.ticketRef.orderByChild('q_num').equalTo(this.state.q_current).on('child_added',(child) => {
			this.getRef().child('ticket/'+child.key).update({is_active: 0})	
		});
		// this.q_refupdate({q_current: this.state.q_current+1});
		// console.log(this.ticketRef)
		// console.log(this.ticketActiveRef)
	}

	_open_close_Q() {
		// Updates the status of the queue
		{this.state.q_status?
			this.q_ref.update({q_open: 0}):this.q_ref.update({q_open: 1})} 
		// resets the current queue number to 0, when queue is opened
		{this.state.q_status?
		()=>{}:this.q_ref.update({q_current: 0})}
		// resets the total queue number to 0, when queue is opened
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
		this.getStoreName();
	}

	render() {
		return (
			<View style={styles.form}>
				<Text style={styles.title}>Welcome Admin for:</Text>
				<Text style={styles.title}>{this.state.store_name}</Text>
				<Text style={styles.information_title}>Current queue number:</Text>
				<Text style={styles.q_number}>{this.state.q_current==10000000000?'No more customers in queue':this.state.q_current}</Text>
				<Text style={styles.information_title}>Number of people in line:</Text>
				<Text style={styles.q_number}>{this.state.q_total==0?'None':this.state.q_total}</Text>
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