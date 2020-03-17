import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {getFeed} from '../APi/index';
import HTML from 'react-native-render-html';
import moment from 'moment';
import CustomHeader from './Utils/customHeader';

export class ContentScreen extends Component {
  state = {
    data: this.props.route.params.story,
  };

  render() {
    const {
      data: {
        title,
        feed,
        picUrl,
        createdAt,
        user: {lastName},
      },
    } = this.state;
    let time = moment(createdAt)
      .startOf('minutes')
      .fromNow();
    let timeData = `<div style="font-size: 12; color: rgba(96,100,109, 1);
          margin-top: 3;">${time}</div>`;
    return (
      <View style={styles.main}>
        <CustomHeader title="story" navigation={this.props.navigation} />
        <View style={styles.body}>
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
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View>
                <HTML html={timeData} />
              </View>
              <View>
                <Text>
                  <Text> </Text>
                </Text>
              </View>
              <View>
                <Text style={styles.by}>posted by: </Text>
              </View>
              <View>
                <Text style={styles.by}>{lastName}</Text>
              </View>
            </View>
            <View style={styles.feed}>
              {feed ? <HTML html={feed} /> : <Text />}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  body:{
    padding: 20,
  },
  by: {
    fontSize: 12,
    bottom: 0,
    paddingBottom: 0,
    marginTop: 3,
    color: 'rgba(96,100,109, 1)',
  },
  image: {
    width: 350,
    height: 200,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5,
  },
});

export default ContentScreen;
