import { saveUserDetailsProp } from '../api/user';
import { createFormValues } from '../../helpers/createFormValues';

/** @type {import('vuex').StoreOptions} */
export const editUserDetailsStore = {
  state: () => ({
    editedField: null,
    form: null,
    error: null,
    loading: false
  }),

  mutations: {
    setUserDetailEditedField(state, { fieldInfo, form }) {
      state.editedField = fieldInfo;
      state.form = form;
    },

    setValueUserDetailFormValue(state, { key, value, type }) {
      if (type === 'date' && type !== 'current') {
        value = new Date(value);
      }

      if (key) {
        state.form[key] = value;
        return;
      }
      state.form = value;
    },

    saveUserDetailFormStart(state) {
      state.loading = true;
      state.error = null;
    },
    saveUserDetailFormSuccess(state) {
      state.loading = false;
      state.error = null;
      state.form = null;

      state.editedField = null;
    },
    saveUserDetailFormFail(state, errMsg) {
      state.loading = false;
      state.error = errMsg;
    }
  },

  actions: {
    setUserDetailEditedField({ commit, rootState }, fieldInfo) {
      let form = null;
      if (fieldInfo !== null) {
        form = createFormValues(
          rootState.auth.userDetails[fieldInfo.fieldName][fieldInfo.idx]
        );
      }

      commit('setUserDetailEditedField', { fieldInfo, form });
    },

    async saveUserDetailForm({ commit, rootState, state }) {
      if (state.editedField === null || state.form === null) {
        commit(
          'saveUserDetailFormFail',
          'Unable to update your data due to internal error, please refresh and try again.'
        );
      }

      const { fieldName, idx } = state.editedField;

      commit('saveUserDetailFormStart');
      const payload = [...rootState.auth.userDetails[fieldName]];

      if (typeof state.form === 'object') {
        // map dates
        payload[idx] = { ...state.form };
      } else {
        payload[idx] = state.form;
      }

      try {
        await saveUserDetailsProp(rootState.auth.user.id, fieldName, payload);
        commit('saveUserDetailFormSuccess');
        commit('setUserDetailsPropValue', {
          value: payload,
          key: fieldName
        });
      } catch (err) {
        commit('saveUserDetailFormFail', err.message);
      }
    }
  }
};
