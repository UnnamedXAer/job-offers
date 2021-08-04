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
          ></button>
        </div>
        <!--  -->
        <div class="modal-body">
          <component
            :is="currentFormComponent"
            :editedField="editedField"
            :label="simpleFormInputlabel"
          ></component>
          <app-error v-if="error">{{ error }}</app-error>
        </div>
        <!--  -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancel">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="submit">
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
import EdicationFormVue from '../editing/EdicationForm.vue';
import KnowledgeFormVue from '../editing/KnowledgeForm.vue';
import SimpleValueFormVue from '../editing/SimpleValueForm.vue';
export default {
  name: 'EditModal',
  components: {
    appEditEducation: EdicationFormVue,
    appEditKnowledge: KnowledgeFormVue,
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
        case 'educations':
          return 'app-edit-education';
        case 'expirience':
          return null;
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

<style scoped>
</style>
