import firebaseAxios from '../../axios/firebase';

export const updateOffer = async (id, offerData) => {
  try {
    const { data } = await firebaseAxios.put(`offers/${id}.json`, offerData);
    console.log('offer updated', data);
  } catch (err) {
    console.log('update offer: error:', err.message || err.toString());
    throw err;
  }
};
