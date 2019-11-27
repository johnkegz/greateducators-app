import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class ReadMore extends Component {
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
  render() {
    return (
      <View>
        <Text> ReadMore </Text>
      </View>
    );
  }
}

export default ReadMore;
