import firebaseAxios from '../../axios/firebase';

export async function saveUserDetailsProp(userId, fieldName, form) {
  try {
    await firebaseAxios.put(
      `/users-data/${userId}/details/${fieldName}.json`,
      form
    );
  } catch (err) {
    console.log('save user details prop: error: ', err);
    throw err;
  }
}
