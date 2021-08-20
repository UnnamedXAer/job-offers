import axios from '../../axios/axios.js';

import { mapApiDataToUser, mapUserToApiData } from '../../helpers/api';
import { errorHandler } from './errorhandler';

export async function authenticate(form, isRegistration) {
  const url = '/' + (isRegistration ? 'registration' : 'login');
  const payload = isRegistration ? mapUserToApiData(form) : form;
  try {
    const { data } = await axios.post(url, payload);
    const user = mapApiDataToUser(data.user);
    return {
      user,
      token: data.token
    };
  } catch (err) {
    errorHandler(err, 'auth: ' + (isRegistration ? 'registration:' : 'login:'));
  }
}

export async function fetchLoggedUser() {
  if (!document.cookie.includes('token=')) {
    throw new Error('no token');
  }

  const url = '/users/info';
  try {
    const { data } = await axios.get(url);
    const user = mapApiDataToUser(data.user);
    return user;
  } catch (err) {
    // errorHandler(err, 'auth: fetch logged user:');
    throw err;
  }
}
