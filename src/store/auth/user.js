import axios from 'axios';
import { editUserDetailsStore } from './editUserDetails';
import {
  mapUserExperienceProp,
  mapUserEducationProp
} from '../../helpers/api.js';

export const getDefaultState = () => ({
  error: null,
  loading: false,
  userDetails: null,
  fetchingUserDetails: false,
  fetchUserDetailsError: null
});

/** @type {import('vuex').StoreOptions} */
export const userStore = {
  modules: { editUserDetails: editUserDetailsStore },

  state: getDefaultState,

  mutations: {
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
    async fetchLoggedUserDetails({ commit, rootState }) {
      commit('fetchLoggedUserDetailsStart');
      try {
        const { data } = await axios.get(
          'http://localhost:3998/home/users/' + rootState.user.id + '/details'
        );
        const { userData } = data;
        const userDetails = {
          education: userData.education.map(mapUserEducationProp),
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
