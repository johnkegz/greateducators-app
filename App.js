import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Reactotron from 'reactotron-react-native';

import HomeScreen from './screens/HomeScreen';
import {getFeeds} from './APi/index';
import ContentScreen from './screens/ContentScreen';
// import WebViewComponent from './screens/WebViewComponent';
import PostScreen from './screens/PostScreen';
import LoginScreen from './screens/LoginScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import LogOutScreen from './screens/LogOut';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './navigation/SplashScreen';

const Stack = createStackNavigator();

const navigationHandler = () => ({
  headerShown: false,
});

function HomeStack(props) {
  const data = props.stories;
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={navigationHandler}>
        {props => {
          return <HomeScreen stories={data} {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="Content" options={navigationHandler}>
        {props => {
          return <ContentScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="LogOut" options={navigationHandler}>
        {props => {
          return <LogOutScreen {...props} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function CreatePostStack() {
  // const [token, setToken] = React.useState('')
  // AsyncStorage.getItem('jwtToken').then(res => {
  //   setToken(res);
  // });
  return (
    <Stack.Navigator initialRouteName="CreatePost">
      {/* <Stack.Screen name="Post" component={Post} options={navigationHandler} /> */}

      {/* <Stack.Screen name="Login" options={navigationHandler}>
        {props => {
          return <LoginScreen {...props} />;
        }}
      </Stack.Screen> */}
      <Stack.Screen name="CreatePost" options={navigationHandler}>
        {props => {
          return <CreatePostScreen {...props} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator(props) {
  const data = props;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./assets/images/home.png')
              : require('./assets/images/home-black.png');
          } else if (route.name === 'Create story') {
            iconName = focused
              ? require('./assets/images/writing.png')
              : require('./assets/images/blog.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home">
        {props => {
          return <HomeStack {...data} {...props} />;
        }}
      </Tab.Screen>
      {/* <Tab.Screen name="Login" component={LoginScreenStack} /> */}
      <Tab.Screen name="Create story" component={CreatePostStack} />
    </Tab.Navigator>
  );
}

const initialState = {
  data: [],
  user: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_MORE':
      return {
        ...state,
        data: [{key: action.data}],
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.data,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {},
      };
  }
  return state;
};

const store = createStore(reducer);

const Display = () => {
  return (
    <>
      <View>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
        <Text>teyr</Text>
      </View>
    </>
  );
};
// const data = false;
export default function App(props) {
  const [postData, setData] = React.useState([]);
  const [token, setToken] = React.useState('');
  const performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      getFeeds().then(res => {
        setData(res.data);
        resolve(res.data);
      }),
    );
  };

  AsyncStorage.getItem('jwtToken').then(res => {
    setToken(res);
  });

  React.useEffect(() => {
    performTimeConsumingTask();
  }, []);

  const handletoken = tokenData => {
    return setToken(tokenData);
  };
  const handleAppState = () => {
    if (postData.length === 0) {
      return <SplashScreen />;
    } else if (token === '' || token === null) {
      return <LoginScreen handletoken={handletoken} />;
    } else {
      // alert(2)
      return (
        <Drawer.Navigator initialRouteName="TabMenu">
          <Drawer.Screen name="TabMenu">
            {props => <TabNavigator stories={postData} />}
          </Drawer.Screen>
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
      );
    }
  };
  return (
    <Provider store={store}>
      <NavigationContainer>{handleAppState()}</NavigationContainer>
    </Provider>
  );
}
