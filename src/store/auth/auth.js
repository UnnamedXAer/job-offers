import { editUserDetailsStore } from './editUserDetails';
import { login } from '../api/auth';

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
    loginStart(state) {
      state.error = null;
      state.loading = true;
    },
    loginSuccess(state, user) {
      state.error = null;
      state.loading = false;
      state.user = user;
    },
    loginFail(state, errMsg) {
      state.error = errMsg;
      state.loading = false;
      state.user = null;
    }
  },

  actions: {
    async login({ commit }, form) {
      const payload = form;

      commit('loginStart');
      try {
        const user = await login(payload);
        commit('loginSuccess', user);
      } catch (err) {
        commit('loginFail', err.message);
      }
    }
  }
};
