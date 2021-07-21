import firebaseAxios from '../../../axios/firebase';
import { mapApiDataToOffers } from '../../../helpers/api';

export const fetchUserOffers = async (userId, filters) => {
  const query = '';
  try {
    const { data } = await firebaseAxios.get('/offers.json?' + query);

    return mapApiDataToOffers(data);
  } catch (err) {
    console.log('fetch user offers: error: ', err);
    throw err;
  }
};
