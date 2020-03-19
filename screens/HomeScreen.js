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
  Linking,
} from 'react-native';
import {getFeeds, getAd} from '../APi/index';
import ReadMore from './More';
import {connect} from 'react-redux';
import Reactotron from 'reactotron-react-native';
import CustomHeader from './Utils/customHeader';

class HomeScreen extends Component {
  state = {
    data: this.props.stories ? this.props.stories : [],
    refreshing: false,
    adData: [],
    readMore: false,
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
          let time = moment(story.createdAt)
            .startOf('minutes')
            .fromNow();
          let timeData = `<div style="font-size: 12; color: rgba(96,100,109, 1);
          margin-top: 3;">${time}</div>`;
          return (
            <View key={story.id} style={styles.feed}>
              <View style={styles.feedImageView}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Content', {story: story})
                  }>
                  <Image
                    // source={require("../assets/images/bu.png")}
                    source={{uri: pic}}
                    style={styles.feedImage}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  return this.props.navigation.navigate('Content', {
                    story: story,
                  });
                }}>
                <View style={styles.feedStory}>
                  <View style={styles.title}>
                    <Text>{story.title}</Text>
                  </View>
                  <View style={styles.downPart}>
                    <View>
                      <HTML html={timeData} />
                    </View>
                    <View>
                      <Text />
                    </View>
                    <View>
                      <Text style={styles.by}>By:</Text>
                    </View>
                    <View>
                      <Text />
                    </View>
                    <View>
                      <Text style={styles.by}>{story.user.lastName}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })
      );

    return result;
  };

  componentDidMount() {
    this.props.readMore();
    getAd().then(res =>
      this.setState({
        adData: res.data,
      }),
    );
  }
  displayAds = data => {
    const ads = data.map(ad => {
      let pic = ad.picUrl;
      return (
        <View
          style={{
            height: 130,
            width: 130,
            marginLeft: 20,
            borderWidth: 0.5,
            borderColor: '#dddddd',
          }}
          key={ad.id}>
          <View style={{flex: 2}}>
            <Image
              source={{uri: pic}}
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
              }}
            />
          </View>
          <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
            <Text>{ad.name}</Text>
          </View>
        </View>
      );
    });
    return ads;
  };

  render() {
    const {data, refreshing} = this.state;
    return (
      <View style={styles.container}>
        {/* <CustomHeader
          title="Geat educators Uganda"
          isHome={true}
          navigation={this.props.navigation}
        /> */}
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
          <View style={{height: 130, marginTop: 20}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.state.adData !== []
                ? this.displayAds(this.state.adData)
                : ''}
            </ScrollView>
          </View>
          <View style={styles.getStartedContainer}>
            <TouchableOpacity
              onPress={() => Linking.openURL('http://greateducatorsug.org/')}>
              <Text style={styles.helpLinkText}>Great Educators Forum</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.helpContainer}>
            <Text>Updates</Text>
          </View>
          <View style={styles.feedContainer}>{this.displayFeed(data)}</View>
          {/* <View style={styles.helpContainer}>
            {this.state.readMore ? (
              <ReadMore />
            ) : (
              <Text
                style={styles.readMoreText}
                onPress={() => this.setState({readMore: true})}>
                Read more
              </Text>
            )}
          </View> */}
        </ScrollView>
      </View>
    );
  }
}

// HomeScreen.navigationOptions = {
//   header: null,
// };

function mapStateToProps(state) {
  return {
    readMoreData: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    readMore: () => dispatch({type: 'READ_MORE', data: 'yooooo'}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
  advertView: {
    margin: 20,
  },
  adverts: {
    width: 180,
    height: 140,
    // marginTop: 3,
    // marginLeft: -10,
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
  downPart: {
    flex: 1,
    flexDirection: 'row',
  },
  by: {
    fontSize: 12,
    bottom: 0,
    paddingBottom: 0,
    marginTop: 3,
    color: 'rgba(96,100,109, 1)',
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
  readMoreText: {
    color: '#1E90FF',
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
