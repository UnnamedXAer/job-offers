import firebaseAxios from '../../axios/firebase';

export async function markOfferAsSeen(id, date) {
  try {
    await firebaseAxios.put(
      '/users-data/my-user-id/offers-seen/' + id + '.json',
      date
    );
    return;
  } catch (err) {
    // nothing to do here for now.
    console.log('mark offer as seen: error:', err);
    throw err;
  }
}

export async function applyToOffer(id, date) {
  try {
    await firebaseAxios.put(
      '/users-data/my-user-id/offers-applied/' + id + '.json',
      date
    );
    return;
  } catch (err) {
    console.log('apply to offer: error:', err);
    throw err;
  }
}

export async function rejectOffer(id, date) {
  try {
    await firebaseAxios.put(
      '/users-data/my-user-id/offers-rejected/' + id + '.json',
      date
    );
    return;
  } catch (err) {
    console.log('reject offer: error:', err);
    throw err;
  }
}
