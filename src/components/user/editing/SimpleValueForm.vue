<template>
  <form v-if="form" @submit.prevent="$emit('form-submit')">
    <div class="mb-3 position-relative">
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
        ref="firstElement"
      />
      <app-field-error>
        {{ errors.simpleValue }}
      </app-field-error>
    </div>
    <input id="form-simple-value-submit" value="Submit" type="submit" hidden />
  </form>
</template>

<script>
import MixinFormVue from './MixinForm.vue';

export default {
  name: 'SimpleValueForm',
  mixins: [MixinFormVue],
  props: {
    label: String
  }
};
</script>
