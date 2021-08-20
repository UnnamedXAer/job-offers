import Axios from 'axios';

const axios = Axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3998/home'
});

export default axios;
