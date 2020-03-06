import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {getFeeds} from '../APi/index';
import SplashScreen from './SplashScreen';
import Reactotron from 'reactotron-react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();

// const performTimeConsumingTask = async () => {
//   alert(0);
//   return new Promise(resolve =>
//     getFeeds().then(res => {
//       this.setState({
//         data: res.data,
//       });
//       resolve(res.data);
//     }),
//   );
// };

// const returnData = async () => {
//   //   alert(0);
//   const data = await performTimeConsumingTask();
//   console.log('data++++', data);
//   if (data !== null) {
//     alert(JSON.stringify(data));
//     this.props.navigation.navigate('Home', {stories: this.state.data});
//   }
//   return data;
// };
// returnData();
// const data = false;
export default function Routes(props) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      getFeeds().then(res => {
        setData({
          data: res.data,
        });
        alert(0);
        resolve(res.data);
      }),
    );
  };

  const Drawer = createDrawerNavigator();

  useEffect(() => {
    async function f() {
      const data = await performTimeConsumingTask();
      Reactotron.log('>>>>>>>>>>>>>>>>>', data);
      //   if (data !== null) {
      //     setData(data);
      //   }
    }
    f();
    return true;
  }, []);
  //   {Reactotron.log('++++++++++', data);}
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {data.length !== 0 ? (
          <>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} stories={data} />}
            </Stack.Screen>
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="Settings" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
