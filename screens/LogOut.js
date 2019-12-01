import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, AsyncStorage} from 'react-native';

class LogOutScreen extends Component {
  signOutAsync = async () => {
    this.props.logOut();
    await AsyncStorage.clear();
    this.props.navigation.navigate('Home');
  };
  componentDidMount() {
    this.signOutAsync();
  }
  render() {
    return (
      <View>
        <Text>Log out</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    logoutData: state.logout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch({type: 'LOGOUT'}),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogOutScreen);
