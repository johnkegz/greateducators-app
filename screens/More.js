import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

export class ReadMore extends Component {
  state = {
    data: [],
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
                onPress={() =>
                  this.props.navigation.navigate('Content', {story: story})
                }>
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

  componentDidMount(){
    this.props.readMore();
  }
  render() {
    console.log("props +++", this.props);
    return (
      <View>
        <Text> ReadMore </Text>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    readMoreData: state.data,
  };
}

function mapDispatchToProps(dispatch){
  return {
    readMore: () => dispatch({type: 'READ_MORE'})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadMore);
