if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
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
  'source.uri should not be an empty string',
  'Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  'Warning: Each child in a list should have a unique "key" prop."',
]);

AppRegistry.registerComponent(appName, () => App);
