import axios from 'axios';
// import { put, takeEvery, call } from 'redux-saga/effects';
export const login = data => {
  return axios
    .post('https://bio-back.herokuapp.com/user/login', data)
    .then(response => response)
    .then(res => res)
    .catch(e => {
      const error = e;
      alert('Login failed please enter your details again');
      return error.message;
    });
};

export const submitStory = data => {
  return axios
    .post('https://bio-back.herokuapp.com/feed', data)
    .then(response => response)
    .then(res => {
      alert('Story created');
      return res;
    })
    .catch(e => {
      const error = e;
      alert('Story was not created please try again');
      return error.message;
    });
};

export const register = data => {
  return axios
    .post('https://bio-back.herokuapp.com/user/register', data)
    .then(response => response)
    .then(res => res)
    .catch(e => {
      const error = e;
      alert('registration failed please try again');
      return error.message;
    });
};
