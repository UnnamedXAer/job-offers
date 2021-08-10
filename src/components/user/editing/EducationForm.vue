<template>
  <form v-if="form" @submit.prevent="$emit('form-submit')">
    <div class="mb-3 position-relative">
      <label for="form-education-school-name" class="col-form-label"
        >School Name</label
      >
      <input
        id="form-education-school-name"
        class="form-control"
        :class="[
          errors.school ? 'is-invalid' : touched.school ? 'is-valid' : ''
        ]"
        :value="form.school"
        @change="onChange('school', $event.target.value)"
        @blur="onBlur('school')"
        ref="firstElement"
      />
      <app-field-error>
        {{ errors.school }}
      </app-field-error>
    </div>
    <div class="mb-3 position-relative">
      <label for="form-education-field" class="col-form-label"
        >Studied Field</label
      >
      <input
        id="form-education-field"
        class="form-control"
        :class="[errors.field ? 'is-invalid' : touched.field ? 'is-valid' : '']"
        :value="form.field"
        @change="onChange('field', $event.target.value)"
        @blur="onBlur('field')"
      />
      <app-field-error>
        {{ errors.field }}
      </app-field-error>
    </div>

    <label for="form-education-start-time" class="col-form-label"
      >Period Start - End</label
    >
    <div class="mb-3 position-relative">
      <div class="input-group" style="flex-wrap: unset">
        <span class="input-group-text">from</span>
        <input
          id="form-education-start-time"
          class="form-control"
          :class="[
            errors.start ? 'is-invalid' : touched.start ? 'is-valid' : ''
          ]"
          type="date"
          :value="form.start"
          @change="onChange('start', $event.target.value)"
          @blur="onBlur('start')"
        />
        <span class="input-group-text">to</span>
        <input
          v-if="form.end === 'current'"
          id="form-education-end-time"
          class="form-control"
          :class="[errors.end ? 'is-invalid' : touched.end ? 'is-valid' : '']"
          value="ongoing"
          disabled
          type="text"
        />
        <input
          v-else
          id="form-education-end-time"
          class="form-control"
          :value="form.end"
          :class="[errors.end ? 'is-invalid' : touched.end ? 'is-valid' : '']"
          type="date"
          @change="onChange('end', $event.target.value)"
          @blur="onBlur('end')"
        />
        <div class="input-group-text">
          <input
            id="form-education-end-current"
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
    <input id="form-education-submit" value="Submit" type="submit" hidden />
  </form>
</template>

<script>
import MixinFormVue from './MixinForm.vue';

export default {
  name: 'EducationForm',
  mixins: [MixinFormVue]
};
</script>
