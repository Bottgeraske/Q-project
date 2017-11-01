import React, {Component} from 'react';
import ReactNative from 'react-native';
const { StyleSheet, Text, View, TouchableHighlight} = ReactNative;

class ActionButton extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onPress}>
          <Text>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = ActionButton;
