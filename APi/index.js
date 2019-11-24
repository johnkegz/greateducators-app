import axios from 'axios';

const url = 'https://bio-back.herokuapp.com/';
const url2 = 'http://10.0.2.2:8000/';
export const getFeeds = async () => {
  try {
    return axios.get(`${url}feed`);
  } catch (error) {
    return error;
  }
};

export const getFeed = async id => {
  try {
    return axios.get(`${url2}feed${id}`);
  } catch (err) {
    return err;
  }
};
