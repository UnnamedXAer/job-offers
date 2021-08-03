<template>
  <form v-if="form !== null">
    <div class="mb-3">
      <label for="message-text" class="col-form-label">Hobby</label>
      <input class="form-control" :value="form.value" @input="onChange" />
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { createFormValues } from '../../../helpers/createFormValues';
export default {
  props: {
    ...mapState({
      form: (state) => state.auth.editUserDetails.form,
      loading: (state) => state.auth.editUserDetails.loading,
      error: (state) => state.auth.editUserDetails.error
    }),
    editedField: null
  },

  methods: {
    onchange(ev) {
      console.log(ev.target.value);
      this.$store.commit('setValueUserDetailFormValue', {
        value: ev.target.value,
        key: 'value'
      });
    }
  },

  created() {
    if (!this.editedField) {
      return null;
    }

    this.$store.commit('setValueUserDetailForm', {
      value: createFormValues(
        // eslint-disable-next-line
        this.$store.state.auth.userDetails[this.editedField.fieldName][
          this.editedField.idx
        ]
      )
    });
  }
};
</script>

<style scoped>
</style>
