/* eslint-disable indent */
import axios from 'axios';

export async function login(payload) {
  const url = 'http://localhost:3998/home/login';
  try {
    const { data } = await axios.post(url, payload);
    return {
      id: data.user.id,
      fname: data.user.firstName,
      lname: data.user.lastName,
      location: data.user.location
        ? {
            name: data.user.location.name,
            coords: {
              lat: data.user.location.coords.lat,
              lng: data.user.location.coords.lng
            }
          }
        : null,
      avatarUrl: data.user.avatarUrl
    };
  } catch (err) {
    console.log('auth: login:', err);
    throw err;
  }
}

export async function registration(payload) {
  const url = 'http://localhost:3998/home/registration';
  try {
    const { data } = await axios.post(url, payload);
    return {
      id: data.user.id,
      fname: data.user.firstName,
      lname: data.user.lastName,
      location: data.user.location
        ? {
            name: data.user.location.name,
            coords: {
              lat: data.user.location.coords.lat,
              lng: data.user.location.coords.lng
            }
          }
        : null,
      avatarUrl: data.user.avatarUrl
    };
  } catch (err) {
    console.log('auth: registration:', err);
    throw err;
  }
}
