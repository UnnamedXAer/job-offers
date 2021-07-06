import axios from 'axios';

const firebaseAxios = axios.create({
  baseURL:
    'https://dev-some-app-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default firebaseAxios;
