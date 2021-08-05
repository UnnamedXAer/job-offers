import axios from 'axios';
import { editUserDetailsStore } from './editUserDetails';
import {
  mapUserExperienceProp,
  mapUseEducationProp
} from '../../helpers/api.js';

/** @type {import('vuex').StoreOptions} */
export const authStore = {
  modules: { editUserDetails: editUserDetailsStore },

  state: () => ({
    user: null,
    error: null,
    loading: false,
    userDetails: null,
    fetchingUserDetails: false
  }),

  mutations: {
    setLoggedUser(state, user) {
      state.error = null;
      state.loading = false;
      state.user = user;
    },
    fetchLoggedUserDetailsStart(state) {
      state.fetchingUserDetails = true;
      state.fetchUserDetailsError = null;
    },
    fetchLoggedUserDetailsSuccess(state, userData) {
      state.userDetails = userData;
      state.fetchingUserDetails = false;
    },
    fetchLoggedUserDetailsFail(state, errMsg) {
      state.fetchUserDetailsError = errMsg;
    },
    setUserDetailsPropValue(state, { value, key }) {
      if (typeof state.userDetails[key] !== 'object') {
        state.userDetails[key] = value;
        return;
      }

      if (Array.isArray(state.userDetails[key])) {
        state.userDetails[key] = [...value];
        return;
      }

      state.userDetails[key] = { ...value };
    }
  },

  actions: {
    async authenticate({ commit }) {
      const user = {
        id: '-zxf34gbb356-35f3',
        fname: 'Dean',
        lname: 'Winchester',
        location: 'Rzeszów',
        avatarUrl: 'http://localhost:3998/home/avatar-placeholder'
      };
      commit('setLoggedUser', user);
    },
    async fetchLoggedUserDetails({ commit, state }) {
      commit('fetchLoggedUserDetailsStart');
      try {
        const { data } = await axios.get(
          'http://localhost:3998/home/user/' + state.user.id
        );
        const { userData } = data;
        const userDetails = {
          education: userData.education.map(mapUseEducationProp),
          knowledge: [...userData.knowledge],
          experience: userData.experience.map(mapUserExperienceProp),
          hobbies: [...userData.hobbies]
        };

        commit('fetchLoggedUserDetailsSuccess', userDetails);
      } catch (err) {
        commit('fetchLoggedUserDetailsFail', err.message);
      }
    }
  }
};
