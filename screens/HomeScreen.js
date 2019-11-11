import React, {Component} from 'react';
import HTML from 'react-native-render-html';
import moment from 'moment';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {getFeeds} from '../APi/index';

export default class HomeScreen extends Component {
  state = {
    data: [],
    refreshing: false,
  };
  displayFeed = stories => {
    const result =
      stories.length === 0 ? (
        <View style={{alignItems: 'center'}}>
          <Text>loading......</Text>
        </View>
      ) : (
        stories.map(story => {
          let pic = story.picUrl;
          return (
            <View key={story.id} style={styles.feed}>
              <View style={styles.feedImageView}>
                <Image
                  // source={require("../assets/images/bu.png")}
                  source={{uri: pic}}
                  style={styles.feedImage}
                />
              </View>
              <View style={styles.feedStory}>
                <View style={styles.title}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Content', {story: story})
                    }>
                    <Text>{story.title}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.feedStoryTime}>
                  <HTML
                    html={moment(story.createdAt)
                      .startOf('minutes')
                      .fromNow()}
                  />
                  <Text />
                </View>
              </View>
            </View>
          );
        })
      );

    return result;
  };

  componentDidMount() {
    getFeeds().then(res =>
      this.setState({
        data: res.data,
      }),
    );
  }
  render() {
    const {data, refreshing} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setTimeout(() => {
                  this.setState({refreshing: false});
                }, 2000);
                this.setState({refreshing: true});
                getFeeds().then(res => {
                  this.setState({
                    data: res.data,
                  });
                });
              }}
            />
          }>
          <View style={styles.welcomeContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('WebViewComponent');
              }}
              style={styles.helpLink}>
              <Image
                source={require('../assets/images/photo.jpg')}
                style={styles.welcomeImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.getStartedContainer}>
            <Text style={styles.helpLinkText}>Great Educators Forum</Text>
          </View>
          <View style={styles.helpContainer}>
            <Text>Updates</Text>
          </View>
          <View style={styles.feedContainer}>{this.displayFeed(data)}</View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    marginBottom: 10,
    height: 100,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,

    backgroundColor: '#F5F5F5',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderColor: '#E6E3E3',
    borderBottomWidth: 1,
  },
  welcomeImage: {
    width: 300,
    height: 150,
    // resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  feedImage: {
    width: 100,
    height: 100,
  },
  feedStory: {
    paddingRight: 110,
    paddingLeft: 10,
    paddingTop: 10,
    // backgroundColor:'#efefef',
    // height: 100,
  },
  title: {
    // borderColor: 'black',
    // borderWidth: 1,
    height: 60,
  },
  feedStoryTime: {
    color: 'rgba(96,100,109, 1)',
    borderColor: 'red',
    // borderWidth: 1,
    // position: 'absolute',
    // bottom: 1,
    // paddingBottom: -100,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  feedContainer: {
    padding: 10,
  },
});
