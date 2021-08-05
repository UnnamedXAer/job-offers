<template>
  <form v-if="form">
    <div class="mb-3">
      <label for="form-education-school-name" class="col-form-label"
        >School Name</label
      >
      <input
        id="form-education-school-name"
        class="form-control"
        :value="form.school"
        @change="onChange('school', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label for="form-education-field-name" class="col-form-label"
        >Studied Field</label
      >
      <input
        id="form-education-field-name"
        class="form-control"
        :value="form.field"
        @change="onChange('field', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label for="form-education-start-time" class="input-group-text"
        >Start - End</label
      >
      <div class="input-group" style="flex-wrap: unset">
        <span class="input-group-text">from</span>
        <input
          id="form-education-start-time"
          class="form-control"
          :value="form.start"
          @change="onChange('start', $event.target.value)"
          type="date"
        />
        <span class="input-group-text">to</span>
        <input
          id="form-edication-end-time"
          class="form-control"
          value="ongoing"
          disabled
          type="text"
          v-if="form.end === 'current'"
        />
        <input
          id="form-edication-end-time"
          class="form-control"
          :value="form.end"
          @change="onChange('end', $event.target.value)"
          type="date"
          v-else
        />
        <div class="input-group-text">
          <input
            id="form-edication-end-current"
            class="form-check-input mt-0"
            type="checkbox"
            aria-label="Set end date as ongoing"
            :checked="form.end === 'current'"
            @change="onChange('end', $event.target.checked ? 'current' : '')"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'EducationForm',
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
      this.$store.commit('setValueUserDetailFormValue', {
        value,
        key
      });
    }
  }
};
</script>

<style scoped>
</style>
