import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Menuu from '../../assets/images/menuu.svg';
export default function CustomHeader({title, isHome, navigation, handleFocus}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#777',
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {isHome ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            {/* <img src= */}
            <Image
              style={{width: 30, height: 30, marginLeft: 5, color: 'white'}}
              source={require('../../assets/images/menu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, marginLeft: 5}}
                source={require('../../assets/images/back.png')}
                resizeMode="contain"
              />
              <Text>Back</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {title === 'Done' ? (
          <TouchableOpacity onPress={() => handleFocus()}>
            <Text style={{textAlign: 'center', backgroundColor: "#eee"}}>Click here if done</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{textAlign: 'center', color: 'white'}}>{title}</Text>
        )}
      </View>
      <View style={{flex: 1}} />
    </View>
  );
}
