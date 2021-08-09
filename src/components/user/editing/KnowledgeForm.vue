<template>
  <form v-if="form" @submit.prevent="$emit('form-submit')">
    <div class="mb-3">
      <label for="form-knowledge-name" class="col-form-label"
        >Technologi Name</label
      >
      <input
        id="form-knowledge-name"
        class="form-control"
        :class="[errors.name ? 'is-invalid' : touched.name ? 'is-valid' : '']"
        :value="form.name"
        @change="onChange('name', $event.target.value)"
        @blur="onBlur('name')"
      />
      <div id="form-knowledge-name-help-block" class="form-text text-danger">
        {{ errors.name }}
      </div>
    </div>
    <input id="form-knowledge-submit" value="Submit" type="submit" hidden />
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'KnowledgeForm',
  props: {
    editedField: null
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
