import axios from 'axios';

import { customLocations } from '../constants/customLocations';

export function getCustomLocation(loc) {
  return customLocations[loc.toLowerCase()];
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          // https://locationiq.com/docs#reverse-geocoding
          const url = `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.VUE_APP_REVERSE_GEOCODING_TOKEN}&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`;

          const { data } = await axios.get(url);

          let name = data.address.city || data.address.village;
          if (data.address.street) {
            name += ', ' + data.address.street;
          }

          const loc = {
            coords: {
              lat: data.lat,
              lng: data.lon
            },
            name
          };
          loc.name = undefined;

          if (!loc.name) {
            throw new Error('Could not resolve current location');
          }
          resolve(loc);
        } catch (err) {
          console.log('reverse geocoding: error:', err);
          reject(err);
        }
      },
      err => {
        console.log('get current location: error:', err);
        if (err.code === 1) {
          return reject(new Error('User denied Geolocation'));
        }
        if (err.code === 2) {
          return reject(
            new Error(
              'No response received from Network Location Provider. Probably you are offline.'
            )
          );
        }
        reject(new Error('Geolocation: ' + err.message));
      }
    );
  });
}
