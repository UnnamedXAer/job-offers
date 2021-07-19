import firebaseAxios from '../../axios/firebase';
import { mockedCompanies } from '../../data_dev/mocked';
import { mapApiDataToOffer } from './user-offers/fetchUserOffers';

export const fetchOffer = async id => {
  try {
    const { data } = await firebaseAxios.get(`/offers/${id}.json`);

    data.company = mockedCompanies.find(x => x.id === data.company);

    return mapApiDataToOffer(id, data);
  } catch (err) {
    console.log('fetch offer: error:', err);
    throw err;
  }
};
