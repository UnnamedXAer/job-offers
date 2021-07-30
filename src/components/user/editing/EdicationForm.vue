<template>
  <form v-if="form">
    <div class="mb-3">
      <label for="message-text" class="col-form-label">School Name</label>
      <input class="form-control" v-model="form.school" />
    </div>
    <div class="mb-3">
      <label for="message-text" class="col-form-label">Studied Field</label>
      <input class="form-control" v-model="form.field" />
    </div>
    <div class="mb-3">
      <label for="message-text" class="input-group-text">Start - End</label>
      <div class="input-group" style="flex-wrap: unset">
        <span class="input-group-text">from</span>
        <input class="form-control" v-model="form.start" type="date" />
        <span class="input-group-text">to</span>
        <input
          class="form-control"
          value="ongoing"
          type="text"
          v-if="form.end === 'current'"
        />
        <input class="form-control" v-model="form.end" type="date" v-else />
        <div class="input-group-text">
          <input
            class="form-check-input mt-0"
            type="checkbox"
            aria-label="Set end date as ongoing"
            :checked="form.end === 'current'"
            @change="
              (e) => {
                form.end = e.target.checked ? 'current' : '';
              }
            "
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { createFormValues } from '../../../helpers/createFormValues';
export default {
  name: 'EducationForm',
  props: {
    fieldName: null
  },
  data() {
    return {
      form: null,
      loading: false,
      error: null
    };
  },
  created() {
    this.form = createFormValues(
      this.$store.state.auth.userDetails[this.fieldName]
    );
  }
};
</script>

<style scoped>
</style>
