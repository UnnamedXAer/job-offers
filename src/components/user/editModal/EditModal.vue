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
          ></component>
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
import EdicationFormVue from '../editing/EdicationForm.vue';
import HobbyFormVue from '../editing/HobbyForm.vue';
export default {
  name: 'EditModal',
  components: {
    appEditEducation: EdicationFormVue,
    appEditHobby: HobbyFormVue
  },
  props: {
    editedField: {
      type: Object
    }
  },

  computed: {
    currentFormComponent() {
      if (!this.editedField) {
        return null;
      }
      switch (this.editedField.fieldName) {
        case 'educations':
          return 'app-edit-education';
        case 'hobbies':
          return 'app-edit-hobby';
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
