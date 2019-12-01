import {AsyncStorage} from 'react-native';
import setAuthToken from '../Utils/setAuthToken';
import jwtDecode from 'jwt-decode';
export const auth = async response => {
  try {
    if (response.data.token === undefined) {
      return false;
    } else if (response === 'Request failed with status code 404') {
      console.log('response auth ++++++++++', response);
      return 'login failed';
    } else {
      await AsyncStorage.setItem('jwtToken', response.data.token);
      const token = await AsyncStorage.getItem('jwtToken');
      setAuthToken(response.data.token);
      const decoded = jwtDecode(token);
      const t = await AsyncStorage.getItem('jwtToken');
      return decoded;
    }
  } catch (error) {
    console.log('register error', error);
    // yield put(loginFailure(error));
  }
};
