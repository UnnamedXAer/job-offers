import firebaseAxios from '../../../axios/firebase';
import { mockedCompanies } from '../../../data_dev/mocked';

export const fetchUserOffers = async (userId, companyId) => {
  const query = '';
  try {
    const { data } = await firebaseAxios.get('/offers.json?' + query);
    for (const key in data) {
      data[key].company = mockedCompanies.find(x => x.id === data[key].company);
    }
    return mapApiDataToOffers(data);
  } catch (err) {
    console.log('fetch user offers: error: ', err);
    throw err;
  }
};

function mapApiDataToOffers(data) {
  const offers = [];
  for (const id in data) {
    offers.push(mapApiDataToOffer(id, data[id]));
  }

  return offers;
}

export function mapApiDataToOffer(
  id,
  {
    userId,
    createdAt,
    expiresAt,
    editedAt,
    company,
    title,
    description,
    requirements,
    tasks,
    stack,
    benefits,
    salary,
    locations
    // seen,
    // applied,
    // rejected
  }
) {
  return {
    id,
    userId,
    createdAt: new Date(createdAt),
    expiresAt: new Date(expiresAt),
    editedAt: editedAt ? new Date(editedAt) : null,
    company,
    title,
    description,
    requirements: requirements || [],
    tasks: tasks || [],
    stack: stack || [],
    benefits: benefits || [],
    salary,
    locations: locations || [],
    seen: Math.ceil(Math.random() * 500),
    applied: Math.ceil(Math.random() * 70),
    rejected: Math.ceil(Math.random() * 30)
  };
}
