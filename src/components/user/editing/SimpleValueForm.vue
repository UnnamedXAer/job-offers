<template>
  <form v-if="form !== null">
    <div class="mb-3">
      <label for="form-simple-value-input" class="col-form-label">{{
        label
      }}</label>
      <input
        id="form-simple-value-input"
        class="form-control"
        :value="form"
        @input="onChange"
      />
    </div>
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
      }
    })
  },

  methods: {
    onChange(ev) {
      console.log(ev.target.value);
      this.$store.commit('setValueUserDetailFormValue', {
        value: ev.target.value
      });
    }
  }
};
</script>

<style scoped>
</style>
