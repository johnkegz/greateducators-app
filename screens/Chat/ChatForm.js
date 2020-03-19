import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
export default function ChatForm({handleMessage, handleSubmit}) {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TextInput
        style={styles.messageBox}
        // onFocus={() => alert(0)}
        placeholder="type Message"
        onChangeText={val => handleMessage(val)}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <View style={styles.chatForm}>
          <Text style={{color: 'white'}}>send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chatForm: {
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 2,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
  },
  messageBox: {
    backgroundColor: '#eedd',
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    width: 280,
  },
});
