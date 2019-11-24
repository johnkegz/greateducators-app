import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {WebView} from 'react-native-webview';

export class PostScreen extends Component {
  state = {
    loading: true,
  };
  render() {
    const {loading} = this.state;
    return (
      <View style={{flex: 1}}>
        {loading ? (
          <Text>Loading ............</Text>
        ) : (
          <Text style={{marginTop: -20}} />
        )}
        <WebView
          onLoad={() => {
            return this.setState({loading: false});
          }}
          source={{uri: 'https://bio-back.herokuapp.com/'}}
        />
      </View>
    );
  }
}

export default PostScreen;
