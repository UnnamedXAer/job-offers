/* eslint-disable indent */
import { parseISO } from 'date-fns';
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

function mapUserPropWithStartEndDate(record) {
  return {
    ...record,
    start: new Date(record.start),
    end: record.end === 'current' ? record.end : new Date(record.end)
  };
}

export const mapUserExperienceProp = mapUserPropWithStartEndDate;
export const mapUserEducationProp = mapUserPropWithStartEndDate;

export function mapApiDataToUser({ user: userData }) {
  if (!userData) {
    throw new Error('Internal error.');
  }

  return {
    id: userData.id,
    fname: userData.firstName,
    lname: userData.lastName,
    dob: userData.dob ? new Date(userData.dob) : null,
    location: userData.location
      ? {
          name: userData.location.name,
          coords: userData.location.coords
            ? {
                lat: userData.location.coords.lat,
                lng: userData.location.coords.lng
              }
            : null
        }
      : null,
    avatarUrl: userData.avatarUrl
  };
}

export function mapUserToApiData(user) {
  return {
    firstName: user.fname,
    lastName: user.lname,
    emailAddress: user.emailAddress,
    dob: user.dob ? parseISO(user.dob) : null,
    password: user.password,
    location: user.location,
    avatarUrl: user.avatarUrl
  };
}
