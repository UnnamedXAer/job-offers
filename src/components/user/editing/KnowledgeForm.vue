<template>
  <form v-if="form">
    <div class="mb-3">
      <label for="form-knowledge-name" class="col-form-label"
        >Technologi Name</label
      >
      <input
        id="form-knowledge-name"
        class="form-control"
        :value="form.name"
        @change="onChange('name', $event.target.value)"
      />
    </div>
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
      }
    })
  },

  methods: {
    onChange(key, value) {
      this.$store.commit('setUserDetailFormValue', {
        value,
        key
      });
    }
  }
};
</script>

<style scoped>
</style>
