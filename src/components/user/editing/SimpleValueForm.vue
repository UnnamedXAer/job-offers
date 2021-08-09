<template>
  <form v-if="form" @submit.prevent="$emit('form-submit')">
    <div class="mb-3">
      <label for="form-simple-value-input" class="col-form-label">{{
        label
      }}</label>
      <input
        id="form-simple-value-input"
        class="form-control"
        :class="[
          errors.simpleValue
            ? 'is-invalid'
            : touched.simpleValue
            ? 'is-valid'
            : ''
        ]"
        :value="form.simpleValue"
        @change="onChange('simpleValue', $event.target.value)"
        @blur="onBlur('simpleValue')"
      />
      <div id="form-simple-value-help-block" class="form-text text-danger">
        {{ errors.simpleValue }}
      </div>
    </div>
    <input id="form-simple-value-submit" value="Submit" type="submit" hidden />
  </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    editedField: null,
    label: String
  },

  computed: {
    ...mapState({
      form: (state) => {
        return state.auth.editUserDetails.form;
      },
      errors: (state) => state.auth.editUserDetails.errors,
      touched: (state) => state.auth.editUserDetails.touched
    })
  },

  methods: {
    onChange(key, value) {
      this.$store.commit('setUserDetailFormValue', {
        value,
        key
      });
      this.$store.dispatch('validateUserDetailForm', { key });
    },
    onBlur(key) {
      if (this.form === null) {
        return;
      }
      this.$store.dispatch('validateUserDetailForm', { key });
    }
  }
};
</script>
