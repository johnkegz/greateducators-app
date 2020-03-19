import React from 'react';
import {View, StyleSheet} from 'react-native';
export default function ChatBody({displayMessages}) {
  return (
    <View style={styles.chartBody}>
      <View>{displayMessages()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartBody: {
    backgroundColor: '#eedd',
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    width: 340,
    minHeight: 300,
  },
});
