<template>
  <div
    class="modal fade"
    :class="{ show: !!fieldName }"
    :style="{ display: fieldName ? 'block' : 'none' }"
    tabindex="-1"
    :aria-modal="!!fieldName"
    aria-labelledby="editModalTitle"
    id="EditModal"
    role="dialog"
  >
    <div class="modal-dialog modal-fullscreen-sm-down">
      <div class="modal-content">
        <!--  -->
        <div class="modal-header">
          <h5 class="modal-title" id="editModalTitle">Edit {{ fieldName }}</h5>
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
            :fieldName="fieldName"
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
    fieldName: {
      type: String
    }
  },

  computed: {
    currentFormComponent() {
      switch (this.fieldName) {
        case 'educations':
          return 'app-edit-education';
      }
      switch (this.fieldName) {
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
