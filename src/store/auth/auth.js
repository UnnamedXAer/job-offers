/** @type {import('vuex').StoreOptions} */
export const authStore = {
  state: () => ({
    user: null,
    error: null,
    loading: false
  }),

  mutations: {
    setUser(state, user) {
      state.error = null;
      state.loading = false;
      state.user = user;
    }
  },

  actions: {
    authenticate({ commit }) {
      const user = {
        id: '-zxf34gbb356-35f3',
        fname: 'Dean',
        lname: 'Winchester'
      };
      commit('setUser', user);
    }
  }
};
