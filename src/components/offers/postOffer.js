import firebaseAxios from '../../axios/firebase';
import { EventBus } from '../../events-bus';

export const postOffer = async offerData => {
  try {
    const { data } = await firebaseAxios.post('offers.json', offerData);
    localStorage.removeItem('unsaved-new-offer');
    EventBus.$emit('offer-created');
    return data.name;
  } catch (err) {
    console.log('Post offer: error:', err.message || err.toString());
    throw err;
  }
};
