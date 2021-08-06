import { saveUserDetailsProp } from '../api/user';
import { createFormValues } from '../../helpers/createFormValues';
import { mapUseEducationProp, mapUserExperienceProp } from '../../helpers/api';
import { validateUserDetailProp } from '../../validation/userDetailsValidation';

/** @type {import('vuex').StoreOptions} */
export const editUserDetailsStore = {
  state: () => ({
    editedField: null,
    form: null,
    error: null,
    loading: false,
    errors: {},
    touched: {}
  }),

  mutations: {
    setUserDetailEditedField(
      state,
      { fieldInfo, form, formErrors, formTouches }
    ) {
      state.editedField = fieldInfo;
      state.form = form;
      state.error = null;
      state.errors = formErrors;
      state.touched = formTouches;
    },

    setUserDetailFormValue(state, { key, value, type }) {
      if (type === 'date' && type !== 'current') {
        value = new Date(value);
      }

      if (key) {
        state.form[key] = value;
        return;
      }
      state.form = value;
    },

    setUserDetailFormError(state, { error, key }) {
      state.touched[key] = true;
      state.errors[key] = error;
    },

    saveUserDetailFormStart(state) {
      state.loading = true;
      state.error = null;
    },
    saveUserDetailFormSuccess(state) {
      state.loading = false;
      state.error = null;
      state.form = null;
      state.errors = null;
      state.touched = null;

      state.editedField = null;
    },
    saveUserDetailFormFail(state, errMsg) {
      state.loading = false;
      state.error = errMsg;
    }
  },

  actions: {
    setUserDetailFormValue({ commit }, payload) {
      commit('setUserDetailFormValue', payload);
    },

    validateUserDetailForm({ commit, state }, { key }) {
      const error = validateUserDetailProp(
        state.form,
        state.editedField.fieldName,
        key
      );
      commit('setUserDetailFormError', { key, error });
    },

    setUserDetailEditedField({ commit, rootState }, fieldInfo) {
      const { form, formErrors, formTouches } = createFormValues(
        rootState.auth.userDetails,
        fieldInfo
      );

      commit('setUserDetailEditedField', {
        fieldInfo,
        form,
        formErrors,
        formTouches
      });
    },

    async saveUserDetailForm({ commit, rootState, state }) {
      if (state.editedField === null || state.form === null) {
        commit(
          'saveUserDetailFormFail',
          'Unable to update your data due to internal error, please refresh and try again.'
        );
      }

      const { fieldName } = state.editedField;

      commit('saveUserDetailFormStart');

      const payload = getUserDetailFormSavePayload(
        rootState.auth.userDetails[fieldName],
        state.form,
        state.editedField
      );

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

function getUserDetailFormSavePayload(oldValues, form, { fieldName, idx }) {
  const payload = [...oldValues];

  if (idx === -1) {
    idx = payload.length;
  }

  if (typeof form === 'object') {
    if (fieldName === 'experience') {
      payload[idx] = mapUserExperienceProp(form);
    } else if (fieldName === 'education') {
      payload[idx] = mapUseEducationProp(form);
    } else {
      payload[idx] = { ...form };
    }
  } else {
    payload[idx] = form;
  }

  return payload;
}
