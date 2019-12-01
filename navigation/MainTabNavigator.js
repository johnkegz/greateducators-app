import React from 'react';
import {Platform, AsyncStorage} from 'react-native';
// import {createBottomTabNavigator} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// import TabBarIcon from '../components/TabBarIcon';
import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import ContentScreen from '../screens/ContentScreen';
import WebViewComponent from '../screens/WebViewComponent';
import PostScreen from '../screens/PostScreen';
import LoginScreen from '../screens/LoginScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import LogOutScreen from '../screens/LogOut';
import RegisterScreen from '../screens/RegisterScreen';
// import RouteConfigs from './Routes';

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Content: ContentScreen,
    WebViewComponent: WebViewComponent,
    CreatePost: CreatePostScreen,
    Register: RegisterScreen,
  },
  config,
);
const postFeedStack = createStackNavigator(
  {
    // Post: PostScreen,
    Login: LoginScreen,
    LogOut: LogOutScreen,
    // WebViewComponent: WebViewComponent,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => <Icon name="ios-home" size={30} color="#4F8EF7" />,
};

//Post stack
postFeedStack.navigationOptions = {
  tabBarLabel: 'Post',
  tabBarIcon: ({focused}) => (
    <Icon name="ios-add-circle" size={30} color="#4F8EF7" />
  ),
  tabBarOnPress: ({navigation, defaultHandler}) => {
    // AsyncStorage.setItem('userToken', 'sdsdsdsd');
    AsyncStorage.getItem('jwtToken').then(res => {
      if (res) {
        navigation.navigate('CreatePost');
      } else {
        navigation.navigate('Login');
      }
    });
  },
};
postFeedStack.path = '';
HomeStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  postFeedStack,
});

tabNavigator.path = '';

// const TabBarComponent = props => <BottomTabBar {...props} />;

// const stackNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: () => ({
//       title: 'A',
//       headerBackTitle: null,
//     }),
//   },
//   config,
// });

// const tabNavigator = createBottomTabNavigator({stackNavigator});

export default tabNavigator;
