import { editUserDetailsStore } from './editUserDetails';
import { authenticate, fetchLoggedUser } from '../api/auth';

let authTimeout = null;

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
    async tryAutologin({ commit }) {
      const tokenData = localStorage.getItem('loggeduser');
      if (tokenData === null) {
        return;
      }
      const token = JSON.parse(tokenData);
      const expiresAt = Date.parse(token.expiresAt);

      const expiresIn = Date.now() - expiresAt;

      if (expiresIn <= 0) {
        localStorage.removeItem('loggeduser');
        return;
      }

      try {
        const { user } = await fetchLoggedUser(token);
        // here token expire value!
        commit('authSuccess', { user, token });
      } catch (err) {
        localStorage.removeItem('loggeduser');
      }
    },

    async authenticate({ commit, dispatch }, { form, isRegistration }) {
      commit('authStart');
      try {
        const { user, token } = await authenticate(form, isRegistration);

        if (authTimeout !== null) {
          clearTimeout(authTimeout);
          authTimeout = null;
        }

        authTimeout = setTimeout(() => {
          authTimeout = null;
          dispatch('logout');
        }, token.expiresIn);

        const tokenPayload = {
          userId: token.userId,
          value: token.value,
          expiresAt: Date.now() + token.expiresIn
        };

        localStorage.setItem('loggeduser', JSON.stringify(tokenPayload));
        commit('authSuccess', { user, token: tokenPayload });
        return true;
      } catch (err) {
        commit('authFail', err.message);
      }
      return false;
    },
    logout({ commit }) {
      if (authTimeout !== null) {
        clearTimeout(authTimeout);
        authTimeout = null;
      }

      localStorage.removeItem('loggeduser');
      commit('logout');
    }
  }
};
