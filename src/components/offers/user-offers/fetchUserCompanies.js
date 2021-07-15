import firebaseAxios from '../../../axios/firebase';

export const fetchUserCompanies = async userId => {
  const query = `${userId}`;
  try {
    const { data } = await firebaseAxios.get('/companies.json?' + query);
    return mapApiDataToCompanies(data);
  } catch (err) {
    console.log('fetch user companies: error: ', err);
    throw err;
  }
};

function mapApiDataToCompanies(data) {
  const companies = [];
  for (const id in data) {
    companies.push(mapApiDataToCompany(id, data[id]));
  }

  return companies;
}

function mapApiDataToCompany(id, { name }) {
  return {
    id,
    name
  };
}
