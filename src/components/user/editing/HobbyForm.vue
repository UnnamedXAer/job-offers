<template>
  <form v-if="value !== null">
    <div class="mb-3">
      <label for="message-text" class="col-form-label">Hobby</label>
      <input class="form-control" v-model="value" />
    </div>
  </form>
</template>

<script>
import { createFormValues } from '../../../helpers/createFormValues';
export default {
  props: {
    fieldName: null
  },
  data() {
    return {
      value: null,
      loading: false,
      error: null
    };
  },
  created() {
    this.value = createFormValues(
      this.$store.state.auth.userDetails[this.fieldName]
    );
  }
};
</script>

<style scoped>
</style>
