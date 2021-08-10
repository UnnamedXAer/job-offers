<template>
  <form v-if="form" @submit.prevent="$emit('form-submit')">
    <div class="mb-3 position-relative">
      <label for="form-experience-company-name" class="col-form-label"
        >Company Name</label
      >
      <input
        id="form-experience-company-name"
        class="form-control"
        :class="[
          errors.company ? 'is-invalid' : touched.company ? 'is-valid' : ''
        ]"
        :value="form.company"
        @change="onChange('company', $event.target.value)"
        @blur="onBlur('company')"
        ref="firstElement"
      />
      <app-field-error>
        {{ errors.company }}
      </app-field-error>
    </div>
    <div class="mb-3 position-relative">
      <label for="form-experience-position-name" class="col-form-label"
        >Position</label
      >
      <input
        id="form-experience-position-name"
        class="form-control"
        :class="[
          errors.position ? 'is-invalid' : touched.position ? 'is-valid' : ''
        ]"
        :value="form.position"
        @change="onChange('position', $event.target.value)"
        @blur="onBlur('position')"
      />
      <app-field-error>
        {{ errors.position }}
      </app-field-error>
    </div>
    <label for="form-experience-start-time" class="col-form-label"
      >Periods Start - End</label
    >
    <div class="mb-3 position-relative">
      <div class="input-group" style="flex-wrap: unset">
        <span class="input-group-text">from</span>
        <input
          id="form-experience-start-time"
          class="form-control"
          :class="[
            errors.start ? 'is-invalid' : touched.start ? 'is-valid' : ''
          ]"
          :value="form.start"
          @change="onChange('start', $event.target.value)"
          @blur="onBlur('start')"
          type="date"
        />
        <span class="input-group-text">to</span>
        <input
          v-if="form.end === 'current'"
          id="form-experience-end-time"
          class="form-control"
          :class="[errors.end ? 'is-invalid' : touched.end ? 'is-valid' : '']"
          value="ongoing"
          disabled
          type="text"
        />
        <input
          v-else
          id="form-experience-end-time"
          class="form-control"
          :class="[errors.end ? 'is-invalid' : touched.end ? 'is-valid' : '']"
          :value="form.end"
          type="date"
          @change="onChange('end', $event.target.value)"
          @blur="onBlur('end')"
        />
        <div class="input-group-text">
          <input
            id="form-experience-end-current"
            class="form-check-input mt-0"
            type="checkbox"
            aria-label="Set end date as ongoing"
            :checked="form.end === 'current'"
            @change="onChange('end', $event.target.checked ? 'current' : '')"
            @blur="onBlur('end')"
          />
        </div>
      </div>
      <app-field-error>
        {{ errors.start ? errors.start : errors.end }}
      </app-field-error>
    </div>
    <input id="form-experience-submit" value="Submit" type="submit" hidden />
  </form>
</template>

<script>
import MixinFormVue from './MixinForm.vue';

export default {
  name: 'ExperienceForm',
  mixins: [MixinFormVue]
};
</script>
