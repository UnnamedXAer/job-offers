import { editUserDetailsStore } from './editUserDetails';
import { authenticate } from '../api/auth';

export const getDefaultState = () => ({
  user: null,
  error: null,
  loading: false,
  userDetails: null,
  fetchingUserDetails: false,
  fetchUserDetailsError: null
});

/** @type {import('vuex').StoreOptions} */
export const authStore = {
  modules: { editUserDetails: editUserDetailsStore },

  state: getDefaultState,

  mutations: {
    authStart(state) {
      state.error = null;
      state.loading = true;
    },
    authSuccess(state, user) {
      state.error = null;
      state.loading = false;
      state.user = user;
    },
    authFail(state, errMsg) {
      state.error = errMsg;
      state.loading = false;
      state.user = null;
    },
    logout(state) {
      state.user = null;
    }
  },

  actions: {
    async authenticate({ commit }, { form, isRegistration }) {
      commit('authStart');
      try {
        const user = await authenticate(form, isRegistration);
        commit('authSuccess', user);
        return true;
      } catch (err) {
        commit('authFail', err.message);
      }
      return false;
    },
    logout({ commit }) {
      commit('logout');
    }
  }
};
