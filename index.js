/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount has been renamed, and is not recommended for use',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use',
  'Module RCTImageLoader requires',
]);

AppRegistry.registerComponent(appName, () => App);
