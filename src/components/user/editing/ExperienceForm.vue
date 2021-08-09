<template>
  <form v-if="form" @submit.prevent="$emit('form-submit')">
    <div class="mb-3">
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
      />
      <div
        id="form-experience-company-help-block"
        class="form-text text-danger"
      >
        {{ errors.company }}
      </div>
    </div>
    <div class="mb-3">
      <label for="form-experience-position-name" class="col-form-label"
        >Studied position</label
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
      <div
        id="form-experience-position-help-block"
        class="form-text text-danger"
      >
        {{ errors.position }}
      </div>
    </div>
    <label for="form-experience-start-time" class="col-form-label"
      >Periods Start - End</label
    >
    <div class="mb-3">
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
      <div id="form-experience-period-help-block" class="form-text text-danger">
        {{ errors.start ? errors.start : errors.end }}
      </div>
    </div>
    <input id="form-experience-submit" value="Submit" type="submit" hidden />
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ExperienceForm',
  props: {
    editedField: null
  },

  computed: {
    ...mapState({
      form: (state) => {
        return state.auth.editUserDetails.form;
      },
      errors: (state) => {
        return state.auth.editUserDetails.errors;
      },
      touched: (state) => {
        return state.auth.editUserDetails.touched;
      }
    })
  },

  methods: {
    onChange(key, value) {
      this.$store.dispatch('setUserDetailFormValue', {
        value,
        key
      });
      this.$store.dispatch('validateUserDetailForm', { key });
    },
    onBlur(key) {
      this.$store.dispatch('validateUserDetailForm', { key });
    }
  }
};
</script>
