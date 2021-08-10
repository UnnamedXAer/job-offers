<template>
  <form v-if="form" @submit.prevent="$emit('form-submit')">
    <div class="mb-3 position-relative">
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
        ref="firstElement"
      />
      <app-field-error>
        {{ errors.name }}
      </app-field-error>
    </div>
    <input id="form-knowledge-submit" value="Submit" type="submit" hidden />
  </form>
</template>

<script>
import MixinFormVue from './MixinForm.vue';

export default {
  name: 'KnowledgeForm',
  mixins: [MixinFormVue]
};
</script>
