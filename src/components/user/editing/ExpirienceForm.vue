<template>
  <form v-if="form">
    <div class="mb-3">
      <label for="form-expirience-company-name" class="col-form-label"
        >Company Name</label
      >
      <input
        id="form-expirience-company-name"
        class="form-control"
        :value="form.company"
        @change="onChange('company', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label for="form-expirience-position-name" class="col-form-label"
        >Studied position</label
      >
      <input
        id="form-expirience-position-name"
        class="form-control"
        :value="form.position"
        @change="onChange('position', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label for="form-expirience-start-time" class="input-group-text"
        >Start - End</label
      >
      <div class="input-group" style="flex-wrap: unset">
        <span class="input-group-text">from</span>
        <input
          id="form-expirience-start-time"
          class="form-control"
          :value="form.start"
          @change="onChange('start', $event.target.value, 'date')"
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
          @change="onChange('end', $event.target.value, 'date')"
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
            @change="
              onChange('end', $event.target.checked ? 'current' : '', 'date')
            "
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ExpirienceForm',
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
    onChange(key, value, type) {
      this.$store.commit('setValueUserDetailFormValue', {
        value,
        key,
        type
      });
    }
  }
};
</script>

<style scoped>
</style>
