import firebaseAxios from '../../axios/firebase';

export async function saveUserDetailsProp(userId, fieldName, form) {
  try {
    const { data } = await firebaseAxios.put(
      `/users-data/${userId}/details/${fieldName}.json`,
      form
    );
    console.log(data);
  } catch (err) {
    debugger;
    console.log('save user details prop: error: ', err);
    throw err;
  }
}
