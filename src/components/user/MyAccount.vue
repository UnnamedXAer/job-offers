<template>
  <div id="my-profile">
    <app-edit-modal
      :editedField="editedField"
      @cancel="clearEditing"
      @save="saveField"
    >
    </app-edit-modal>

    <app-user-info></app-user-info>

    <app-error v-if="error">{{ error }}</app-error>
    <div
      v-else-if="loading"
      class="spinner-border text-primary mx-auto"
      style="width: 3rem; height: 3rem; border-width: 0.4em; display: block"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>

    <section class="row row-cols-1 row-cols-md-2 g-4" v-else-if="userDetails">
      <app-education-card></app-education-card>
      <app-experience-card></app-experience-card>
      <app-knowledge-card></app-knowledge-card>
      <app-simple-value-card
        cardTitle="Hobbies"
        name="hobbies"
      ></app-simple-value-card>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EditModalVue from './editModal/EditModal.vue';
import ErrorVue from '../ui/alerts/Error.vue';
import EducationCardVue from './detailsCards/EducationCard.vue';
import ExperienceCardVue from './detailsCards/ExperienceCard.vue';
import KnowledgeCardVue from './detailsCards/KnowledgeCard.vue';
import SimpleValueCardVue from './detailsCards/SimpleValueCard.vue';
import UserInfoVue from './userInfo/UserInfo.vue';

export default {
  name: 'MyProfile',
  components: {
    appEditModal: EditModalVue,
    appError: ErrorVue,
    appUserInfo: UserInfoVue,
    appEducationCard: EducationCardVue,
    appExperienceCard: ExperienceCardVue,
    appKnowledgeCard: KnowledgeCardVue,
    appSimpleValueCard: SimpleValueCardVue
  },
  computed: {
    ...mapState({
      userDetails: (state) => state.auth.userDetails,
      editedField: (state) => state.auth.editUserDetails.editedField,
      loading: (state) => state.auth.fetchingUserDetails,
      error: (state) => state.auth.fetchUserDetailsError
    })
  },
  methods: {
    clearEditing() {
      this.$store.dispatch('setUserDetailEditedField', null);
    },
    saveField() {
      this.$store.dispatch('saveUserDetailForm');
    }
  },
  created() {
    if (!this.$store.state.auth.userDetails) {
      this.$store.dispatch('fetchLoggedUserDetails');
    }
  }
};
</script>

<style scoped>

</style>
