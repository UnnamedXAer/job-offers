import { getDefaultState as authGetDefaultState } from '@/store/auth/auth.js';
import { getDefaultState as userDetailsGetDefaultState } from '@/store/auth/editUserDetails.js';

export const mockedUser = {
  id: '-zxf34gbb356-35f3',
  fname: 'Dean',
  lname: 'Winchester',
  location: 'Rzeszów',
  avatarUrl: 'http://localhost:3998/home/avatar-placeholder'
};

export const state = {
  auth: {
    editUserDetails: userDetailsGetDefaultState(),
    ...authGetDefaultState(),
    user: mockedUser,
    userDetails: {
      education: [],
      knowledge: [],
      experience: [],
      hobbies: []
    }
  }
};

export function getState() {
  return deepCopy(state);
}

export function deepCopy(arg) {
  if (typeof arg === 'object' && arg !== null) {
    if (Array.isArray(arg)) {
      const out = arg.map(deepCopy);
      return out;
    }

    const out = {};
    for (const key in arg) {
      out[key] = deepCopy(arg[key]);
    }

    return out;
  }

  return arg;
}
