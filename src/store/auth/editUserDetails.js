import { saveUserDetailsProp } from '../api/user';
import { createFormValues } from '../../helpers/createFormValues';
import { mapUserEducationProp, mapUserExperienceProp } from '../../helpers/api';
import { validateUserDetailProp } from '../../validation/userDetailsValidation';

export const getDefaultState = () => ({
  editedField: null,
  form: null,
  error: null,
  loading: false,
  errors: {},
  touched: {}
});

/** @type {import('vuex').StoreOptions} */
export const editUserDetailsStore = {
  state: getDefaultState,

  mutations: {
    setUserDetailEditedField(
      state,
      { fieldInfo, form, formErrors, formTouches }
    ) {
      state.error = null;
      state.editedField = fieldInfo;
      state.form = form;
      state.errors = formErrors;
      state.touched = formTouches;
    },

    setUserDetailFormValue(state, { key, value }) {
      state.form[key] = value;
      state.touched[key] = true;
    },

    setUserDetailFormError(state, { error, key }) {
      state.touched[key] = true;
      state.errors[key] = error;

      if (error === null) {
        state.error = null;
      }
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

    validateUserDetailFormAll({ dispatch, state }) {
      if (typeof state.form !== 'object') {
        dispatch('validateUserDetailForm', { key: 'simpleValue' });
        return;
      }

      for (const key in state.form) {
        dispatch('validateUserDetailForm', { key });
      }
    },

    validateUserDetailForm({ commit, state }, { key }) {
      const error = validateUserDetailProp(
        state.form,
        state.editedField.fieldName,
        key
      );
      commit('setUserDetailFormError', { key, error });

      if (key === 'start' && state.touched.end) {
        const error = validateUserDetailProp(
          state.form,
          state.editedField.fieldName,
          'end'
        );
        commit('setUserDetailFormError', { key: 'end', error });
        return;
      }

      if (key === 'end' && state.touched.start) {
        const error = validateUserDetailProp(
          state.form,
          state.editedField.fieldName,
          'start'
        );
        commit('setUserDetailFormError', { key: 'start', error });
      }
    },

    setUserDetailEditedField({ commit, rootState }, fieldInfo) {
      const { form, formErrors, formTouches } = createFormValues(
        rootState.auth.userDetails,
        fieldInfo
      );

      commit('setUserDetailEditedField', {
        fieldInfo: fieldInfo ? { ...fieldInfo } : null,
        form,
        formErrors,
        formTouches
      });
    },

    async saveUserDetailForm({ commit, dispatch, rootState, state }) {
      if (state.editedField === null || state.form === null) {
        commit(
          'saveUserDetailFormFail',
          'Unable to update your data due to internal error, please refresh and try again.'
        );
      }

      const { fieldName } = state.editedField;

      dispatch('validateUserDetailFormAll');

      for (const key in state.errors) {
        if (state.errors[key] !== null) {
          commit('saveUserDetailFormFail', 'Form has errors.');
          return;
        }
      }

      commit('saveUserDetailFormStart');

      const payload = prepareUserDetailFormSavePayload(
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

function prepareUserDetailFormSavePayload(
  oldValues,
  form,
  { fieldName, idx, isSimpleValue }
) {
  const payload = [...oldValues];

  if (idx === -1) {
    idx = payload.length;
  }

  if (isSimpleValue) {
    payload[idx] = form.simpleValue;
  } else {
    if (fieldName === 'experience') {
      payload[idx] = mapUserExperienceProp(form);
    } else if (fieldName === 'education') {
      payload[idx] = mapUserEducationProp(form);
    } else {
      payload[idx] = { ...form };
    }
  }

  return payload;
}
