<template>
  <form @submit.prevent="submit">
    <label :for="'offer-' + dataName" class="form-label fw-bold">{{
      label
    }}</label>
    <div class="input-group" style="flex-wrap: unset">
      <input
        type="text"
        class="form-control"
        :id="'offer-' + dataName"
        :list="'offer-' + dataName + '-datalist'"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :required="required"
        :autocomplete="autocomplete"
        ref="input"
      />
      <datalist :id="'offer-' + dataName + '-datalist'">
        <option v-for="opt in datalists" :value="opt" :key="opt"></option>
      </datalist>
      <button
        class="btn btn-outline-primary"
        type="submit"
        :aria-label="'add element to ' + dataName + ' list'"
      >
        <i class="bi bi-plus"></i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    dataName: { type: String, required: true },
    value: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, required: true },
    datalists: { type: Array },
    required: Boolean,
    autocomplete: String
  },
  methods: {
    submit() {
      this.$emit('add-to-list', this.dataName);
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  }
};
</script>

<style>
</style>
