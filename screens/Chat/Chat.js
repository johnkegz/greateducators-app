import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import socketIOClient from 'socket.io-client';
import ChatBody from './ChatBody';
import ChatForm from './ChatForm';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.socket = socketIOClient('http://10.20.74.36:3000');
    this.initialState = {
      message: '',
      chatMessages: [],
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.socket.on('message', data => {
      this.setState({
        chatMessages: data,
      });
    });
  }

  handleMessage = val => {
    return this.setState({
      message: val,
    });
  };
  handleSubmit = () => {
    this.socket.emit('message', this.state.message);

    return true;
  };

  displayMessages = () => {
    return (
      <View>
        {this.state.chatMessages.map((message, index) => {
          return <Text key={index}>{message.message}</Text>;
        })}
      </View>
    );
  };
  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <ChatBody displayMessages={this.displayMessages} />
            <ChatForm
              handleMessage={this.handleMessage}
              handleSubmit={this.handleSubmit}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default ChatScreen;
