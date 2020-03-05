import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Routes from './Routes';

// import MainTabNavigator from './MainTabNavigator';
import SplashScreen from './SplashScreen';

// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Splash: SplashScreen,
//     Main: Routes,
//   }),
// );
export default Routes;
