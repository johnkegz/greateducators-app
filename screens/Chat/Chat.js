import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import jwtDecode from 'jwt-decode';

import socketIOClient from 'socket.io-client';
import ChatBody from './ChatBody';
import ChatForm from './ChatForm';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.socket = socketIOClient('http://192.168.43.52:3001');
    this.initialState = {
      message: {},
      chatMessages: [],
      userId: null,
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.socket.on('message', data => {
      this.setState(prevState => {
        return {...prevState, chatMessages: [...data],}
      });
    });

    AsyncStorage.getItem('jwtToken').then(res => {
      const decoded = jwtDecode(res);
      this.setState({userId: decoded.id});
    });
  }

  handleMessage = val => {
    return this.setState({
      message: {val: val, userId: this.state.userId},
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
          const displayType = message.message.userId === this.state.userId? "none": "flex";
          return (
            <>
            <View style={styles.messageContainer}>
                <View style={{borderColor: "brown", borderWidth: 1, height: 60, width: 60, borderRadius: 50, display: displayType}}>
                  <Text>img</Text>
                </View>
                  <View style={{borderColor: "brown", borderWidth: 1, width: "80%", marginTop: 4, minHeight: 50, marginLeft: displayType === "none"? 65: 0}}><Text>{message.message.val}</Text></View>
            </View>
          </>
          );
        })}
      </View>
    );
  };
  render() {
    console.log("statee>>>>>", this.state.chatMessages)
    return (
      <>
        <SafeAreaView>
        
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={{maxHeight: 650}}>
              <ChatBody displayMessages={this.displayMessages} />
            </View>
            
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

const styles = StyleSheet.create({
  chartBody: {
    // padding: 10,
    // margin: 10,
    minHeight: 650,
  },
  messageContainer:{
    flex: 1,
    flexDirection: "row",
    marginLeft: 2,
    
  },
  personalContainer:{
    marginLeft: 2,
  },
});
