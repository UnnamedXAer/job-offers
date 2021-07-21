import firebaseAxios from '../../axios/firebase';
import { mapApiDataToOffers } from '../../helpers/api';

export const fetchLookupRecommendedOffers = async filters => {
  let query = `?orderBy="createdAt"&limitToFirst=10`;
  try {
    const { data } = await firebaseAxios.get('/offers.json' + query);

    const offers = mapApiDataToOffers(data);

    return offers;
  } catch (err) {
    console.log('lookup: fetch offers: error:', err);
    throw err;
  }
};
