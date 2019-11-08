import React, {Component} from 'react';;
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';;
import {getFeed} from '../APi/index';
import HTML from 'react-native-render-html';
import moment from 'moment';

export class ContentScreen extends Component {
  state = {
    data: this.props.navigation.getParam('story'),
  };

  render() {
    const {
      data: {title, feed, picUrl, createdAt},
    } = this.state;
    return (
      <View style={styles.main}>
        <ScrollView>
          <View style={styles.imageView}>
            {picUrl ? (
              <Image source={{uri: picUrl}} style={styles.image} />
            ) : (
              <Text>Loading image</Text>
            )}
          </View>
          <View>
            <Text style={styles.title}>
              <Text style={{fontWeight: 'bold'}}>{title}</Text>
            </Text>
          </View>
          <HTML
            html={moment(createdAt)
              .startOf('minutes')
              .fromNow()}
          />
          <View style={styles.feed}>
            {feed ? <HTML html={feed} /> : <Text />}
          </View>
        </ScrollView>
      </View>
    );;
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
    flex: 1,
  },
  // imageView:{
  //     height: 200,
  //     backgroundColor: 'red',
  //     resizeMode: 'contain'
  // },
  image: {
    width: 350,
    height: 200,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5,
  },
});;

export default ContentScreen;
