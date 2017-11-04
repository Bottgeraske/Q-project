import React, {Component} from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
const {
    Text,
    FlatList,
    View,
    TouchableHighlight
} = ReactNative;

const ListItem = ({item, onPress}) => {
    return(
        <TouchableHighlight
            onPress={onPress}
            style={styles.listItem}
        >
            <View>
                <Text style={{fontSize:20}}>{item.storeName}</Text>
                <Text style={{fontStyle:'italic'}}>Nummer:</Text><Text>{item.ticketNumber}</Text>
            </View>
        </TouchableHighlight>
    );
};

class QueueView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTickets: []
        }
        this.ticketsRef = firebase.database().ref().child('ticket');
        this.storesRef = firebase.database().ref().child('store');

    }

    componentDidMount() {
        this.getActiveQueues();
    }

    getActiveQueues() {
        let activeTickets = [];
        this.ticketsRef.orderByChild('customerKey').equalTo(this.props.customer.key).once('value', (tickets) => {
            tickets.forEach((ticket) => {
                let _ticket = ticket.val();
                if(_ticket.isActive) {
                    this.storesRef.orderByKey().equalTo(_ticket.storeKey).once('child_added', (store) => {
                        _ticket.storeName = store.val().name;
                        activeTickets.push(_ticket);
                        //this runs every time, should be optimized
                        this.setState({activeTickets: activeTickets});
                    });
                }
            });
        });
    }

    render() {
        return(
            <View>
                <Text>Active tickets</Text>
                <FlatList
                    data={this.state.activeTickets}
                    renderItem={({item}) => <ListItem
                        item={item}
                        onPress={() => {
                            alert(item.storeName);
                        }}
                    />}

                />
            </View>
        )
    }
}

const styles = {
    listItem: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#d6d7da',
    }
}

module.exports = QueueView;