import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
export default function ChatBody({displayMessages}) {
  return (
    <View style={styles.chartBody}>
      {/* <View>{displayMessages()}</View> */}
      <View style={{borderColor: "brown", borderWidth: 1, height: 60, width: 60, borderRadius: 50}}><Text>img</Text></View>
      <View style={{borderColor: "brown"}}><Text>img</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartBody: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: '#eedd',
    // borderColor: 'green',
    // borderWidth: 2,
    padding: 10,
    margin: 10,
    minHeight: 600,
  },
});
