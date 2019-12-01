/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

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

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
