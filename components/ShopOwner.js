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
			currentNumber: 0,
			peopleInQueue: 0,
			isOpen: 0,
			storeKey: this.props.storeKey,
			storeName: 0,
		};
		this.storeRef = this.getRef().child('store');
		this.currentNumberRef = this.getRef().child('store/'+this.state.storeKey)
		this.ticketRef = this.getRef().child('ticket')
	}

	getRef() {
		return firebase.database().ref();
	}

	getStoreName(){
		this.storeRef.orderByKey().equalTo(this.state.storeKey).on('value', (snap) => {
			let name = ''
			snap.forEach((child) => {
				name = child.val().name
			});
			this.setState({storeName: name})
		});
	}


	getCurrentQ(){
		this.ticketRef.orderByChild('storeKey').equalTo(this.state.storeKey).on('value', (snap) => {
			let next_customer = 10000000000
	  		snap.forEach((child) => {
				if (child.val().isActive) {
					if (next_customer > child.val().ticketNumber) {
						next_customer = child.val().ticketNumber
					}
				}
			});
			this.setState({currentNumber: next_customer});
		});
	}

	getTotalQ(){
		this.ticketRef.orderByChild('storeKey').equalTo(this.state.storeKey).on('value', (snap) => {
			let activePeople = 0;
	  		snap.forEach((child) => {
				if (child.val().isActive) {
					activePeople++
				}
			});
			this.setState({peopleInQueue: activePeople})
		});
	}

	getQStatus(){
		this.storeRef.orderByKey().equalTo(this.state.storeKey).on('value', (snap) => {
			let status = 0;
			snap.forEach((child) => {
				status = child.val().isOpen
			});
			this.setState({isOpen: status});
		});
	}

	_customerServed() {
		this.ticketRef.orderByChild('ticketNumber').equalTo(this.state.currentNumber).on('child_added',(child) => {
			this.getRef().child('ticket/'+child.key).update({isActive: 0})
		});
	}

	_open_close_Q() {
		// Updates the status of the queue.
		this.state.isOpen? this.currentNumberRef.update({isOpen: 0}) : this.currentNumberRef.update({isOpen: 1})
		// resets the current queue number to 0, when queue is opened
		if(!this.state.isOpen) {
			this.currentNumberRef.update({currentNumber: 0});
            this.currentNumberRef.update({peopleInQueue: 0})
        }
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
				<Text style={styles.title}>{this.state.storeName}</Text>
				<Text style={styles.information_title}>Current queue number:</Text>
				<Text style={styles.q_number}>{this.state.currentNumber==10000000000?'No more customers in queue':this.state.currentNumber}</Text>
				<Text style={styles.information_title}>Number of people in line:</Text>
				<Text style={styles.q_number}>{this.state.peopleInQueue==0?'None':this.state.peopleInQueue}</Text>
				<View>
				{this.state.isOpen ?
					<Button onPress={this._customerServed.bind(this)} title="Kunde betjent"/>
					:
					<Button disabled onPress={()=>{}} title="Kunde betjent"/>}
				</View>
				<Button onPress={this._open_close_Q.bind(this)} title={this.state.isOpen?"Luk Kø":"Åbn Kø"}/>
				<Button onPress={this._logout.bind(this)} title="Log ud"/>
			</View>
		)
	}
}
module.exports = ShopOwner;