import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
export default function ChatBody({displayMessages}) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.chartBody}>
      <View style={{flex: 1}}>
        {/* <View style={styles.messageContainer}>
        <View style={{borderColor: "brown", borderWidth: 1, height: 60, width: 60, borderRadius: 50}}>
          <Text>img</Text></View>
          <View style={styles.userMessage}><Text>yubsdjd</Text></View>
        </View> */}
            <View>{displayMessages()}</View>
        </View>
      <View></View>
    </ScrollView>
  );
}

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
  userMessage: {borderColor: "brown", borderWidth: 1, width: "80%", marginTop: 4}
});
