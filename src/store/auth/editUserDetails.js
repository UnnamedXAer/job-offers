/** @type {import('vuex').StoreOptions} */
export const editUserDetailsStore = {
  state: () => ({
    form: null,
    error: null,
    loading: false
  }),

  mutations: {
    setValueUserDetailForm(state, form) {
      state.form = form;
    },
    setValueUserDetailFormValue(state, { key, value }) {
      state.form[key] = value;
    }
  }
};
