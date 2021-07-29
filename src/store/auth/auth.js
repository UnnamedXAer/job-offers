import axios from 'axios';

/** @type {import('vuex').StoreOptions} */
export const authStore = {
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
          educations: userData.educations.map(x => ({
            ...x,
            start: new Date(x.start),
            end: x.end === 'current' ? x.end : new Date(x.end)
          })),
          knowledge: [...userData.knowledge],
          experience: userData.experience.map(x => ({
            ...x,
            start: new Date(x.start),
            end: x.end === 'current' ? x.end : new Date(x.end)
          })),
          hobbies: [...userData.hobbies]
        };

        commit('fetchLoggedUserDetailsSuccess', userDetails);
      } catch (err) {
        commit('fetchLoggedUserDetailsFail', err.message);
      }
    }
  }
};
