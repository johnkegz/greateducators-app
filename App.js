import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
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
// import ContentScreen from '../screens/ContentScreen';
// import WebViewComponent from '../screens/WebViewComponent';
// import PostScreen from '../screens/PostScreen';
// import LoginScreen from '../screens/LoginScreen';
// import CreatePostScreen from '../screens/CreatePostScreen';
// import LogOutScreen from '../screens/LogOut';
// import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from './navigation/SplashScreen';

const Stack = createStackNavigator();

const navigationHandler = () => ({
  headerShown: false,
});

function HomeStack(props) {
  // Reactotron.log('prop+++++++++>>', props.stories);
  const data = props.stories;
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={navigationHandler}>
        {props => {
          return <HomeScreen stories={data} />;
        }}
      </Stack.Screen>
      <Stack.Screen
        name="HomeDetails"
        component={HomeDetailsScreen}
        options={navigationHandler}
      />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={navigationHandler}
      />
      <Stack.Screen
        name="SettingsDetails"
        component={SettingsDetailsScreen}
        options={navigationHandler}
      />
    </Stack.Navigator>
  );
}

function CustomHeader({title, isHome, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {isHome ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{width: 30, height: 30, marginLeft: 5}}
              source={require('./assets/images/list.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, marginLeft: 5}}
                source={require('./assets/images/back.png')}
                resizeMode="contain"
              />
              <Text>Back</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{title}</Text>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
}

// function HomeScreen({navigation}) {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <CustomHeader title="Home" isHome={true} navigation={navigation} />
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Home!</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('HomeDetails')}>
//           <Text>Got to details!</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

function HomeDetailsScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}} isHome={false}>
      <CustomHeader title="HomeDetails" navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home Details!</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="settingsDetails" navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsDetails')}>
          <Text>Got to details!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SettingsDetailsScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="settings" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings Details!</Text>
      </View>
    </SafeAreaView>
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
  // Reactotron.log("______________---", props)
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./assets/images/home.png')
              : require('./assets/images/home-black.png');
          } else if (route.name === 'Settings') {
            iconName = focused
              ? require('./assets/images/settings.png')
              : require('./assets/images/settings-black.png');
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
          return <HomeStack {...data} />;
        }}
      </Tab.Screen>
      <Tab.Screen name="Settings" component={SettingStack} />
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
// const data = false;
export default function App() {
  const [data, setData] = React.useState([]);
  const performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      getFeeds().then(res => {
        setData(res.data);
        resolve(res.data);
      }),
    );
  };

  React.useEffect(() => {
    performTimeConsumingTask();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {data.length === 0 ? (
          <SplashScreen />
        ) : (
          <Drawer.Navigator initialRouteName="TabMenu">
            <Drawer.Screen name="TabMenu">
              {props => <TabNavigator stories={data} />}
            </Drawer.Screen>
            <Drawer.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
