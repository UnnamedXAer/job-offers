<template>
  <div
    class="modal fade"
    :class="{ show: !!editedField }"
    :style="{ display: editedField ? 'block' : 'none' }"
    tabindex="-1"
    :aria-modal="!!editedField"
    aria-labelledby="editModalTitle"
    id="EditModal"
    role="dialog"
  >
    <div class="modal-dialog modal-fullscreen-sm-down">
      <div class="modal-content">
        <!--  -->
        <div class="modal-header">
          <h5 class="modal-title" id="editModalTitle" v-if="editedField">
            Edit {{ editedField.fieldName }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="cancel"
            :disabled="loading"
          ></button>
        </div>
        <!--  -->
        <div class="modal-body">
          <component
            :is="currentFormComponent"
            :editedField="editedField"
            :label="simpleFormInputlabel"
            @form-submit="submit"
          ></component>
          <app-error v-if="error">{{ error }}</app-error>
        </div>
        <!--  -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="cancel"
            :disabled="loading"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="submit"
            :disabled="loading"
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-if="loading"
            ></span>
            Save
          </button>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ErrorVue from '../../ui/alerts/Error.vue';
import EducationFormVue from '../editing/EducationForm.vue';
import ExperienceFormVue from '../editing/ExperienceForm.vue';
import KnowledgeFormVue from '../editing/KnowledgeForm.vue';
import SimpleValueFormVue from '../editing/SimpleValueForm.vue';
export default {
  name: 'EditModal',
  components: {
    appEditEducation: EducationFormVue,
    appEditKnowledge: KnowledgeFormVue,
    appEditExperience: ExperienceFormVue,
    appEditSimpleValue: SimpleValueFormVue,
    appError: ErrorVue
  },
  props: {
    editedField: {
      type: Object
    }
  },

  computed: {
    ...mapState({
      loading: (state) => state.auth.editUserDetails.loading,
      error: (state) => state.auth.editUserDetails.error
    }),
    currentFormComponent() {
      if (!this.editedField) {
        return null;
      }
      switch (this.editedField.fieldName) {
        case 'education':
          return 'app-edit-education';
        case 'experience':
          return 'app-edit-experience';
        case 'knowledge':
          return 'app-edit-knowledge';
        case 'hobbies':
          return 'app-edit-simple-value';
      }
      return null;
    },
    simpleFormInputlabel() {
      if (!this.editedField) {
        return null;
      }
      switch (this.editedField.fieldName) {
        case 'hobbies':
          return 'Hobby';
      }
      return null;
    }
  },

  methods: {
    submit() {
      this.$emit('save');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>
