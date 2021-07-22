import firebaseAxios from '../../axios/firebase';
import { mockedCompanies } from '../../data_dev/mocked';
import { mapApiDataToOffer, mapApiDataToOffers } from '../../helpers/api';

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

export const fetchNextOffers = async (userId, batchSize, startAt) => {
  //   const query = `?orderBy="createdAt"&limitToFirst=${batchSize}&startAt=${startAt}`;
  // just for firebase as i don't want to waste time to make logic
  // to be able to sort by the create date in firebase
  const query = `?orderBy="createdAt"`;
  console.log(query);
  try {
    const { data } = await firebaseAxios.get('/offers.json' + query);

    return mapApiDataToOffers(data)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .splice(startAt, batchSize);
  } catch (err) {
    console.log('fetch next offers: error:', err);
    throw err;
  }
};
