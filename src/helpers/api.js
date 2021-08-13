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

export function mapApiDataToUser(data) {
  return {
    id: data.user.id,
    fname: data.user.firstName,
    lname: data.user.lastName,
    dob: data.user.dob ? new Date(data.user.dob) : null,
    location: data.user.location
      ? {
          name: data.user.location.name,
          coords: data.user.location.coords
            ? {
                lat: data.user.location.coords.lat,
                lng: data.user.location.coords.lng
              }
            : null
        }
      : null,
    avatarUrl: data.user.avatarUrl
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
