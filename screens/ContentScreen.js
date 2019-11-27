import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {getFeed} from '../APi/index';
import HTML from 'react-native-render-html';
import moment from 'moment';

export class ContentScreen extends Component {
  state = {
    data: this.props.navigation.getParam('story'),
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
                <Text>         </Text>
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
    );
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
    flex: 1,
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
