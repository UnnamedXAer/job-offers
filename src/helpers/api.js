import { mockedCompanies } from '../data_dev/mocked';

export function mapApiDataToOffers(data) {
  for (const key in data) {
    data[key].company = mockedCompanies.find(x => x.id === data[key].company);
  }

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

function mapUserPropWithStartEndDate(records) {
  return records.map(x => ({
    ...x,
    start: new Date(x.start),
    end: x.end === 'current' ? x.end : new Date(x.end)
  }));
}

export const mapUserExperienceProp = mapUserPropWithStartEndDate;
export const mapUseEducationProp = mapUserPropWithStartEndDate;
