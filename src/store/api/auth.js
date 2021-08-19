import axios from 'axios';
import { mapApiDataToUser, mapUserToApiData } from '../../helpers/api';
import { errorHandler } from './errorhandler';

export async function authenticate(form, isRegistration) {
  const url =
    'http://localhost:3998/home/' + (isRegistration ? 'registration' : 'login');
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
  return {};
}
