import React from 'react';
import {View, Text, Image} from 'react-native';
import {getFeeds} from '../APi/index';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      //   setTimeout(() => {
      //     resolve('result');
      //   }, 2000),
      getFeeds().then(res => {
        this.setState({
          data: res.data,
        });
        resolve(res.data);
      }),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('Home', {stories: this.state.data});
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          source={require('../assets/images/photo.jpg')}
          style={styles.welcomeImage}
        />
        <Text style={styles.textStyles}>Great educators</Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textStyles: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
  welcomeImage: {
    width: 300,
    height: 150,
    // resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
};

export default SplashScreen;
