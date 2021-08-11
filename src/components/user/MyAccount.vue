<template>
  <div>
    <app-edit-modal
      :editedField="editedField"
      @cancel="clearEditing"
      @save="saveField"
    >
    </app-edit-modal>

    <section class="row mb-4">
      <div class="col-12 col-sm-5 __avatar_container">
        <div class="mx-auto __avatar_wrapper">
          <img
            class="img-thumbnail __avatar"
            :src="user.avatarUrl ? user.avatarUrl : '@/assets/icons/user.svg'"
            alt="Avatar image"
          />
        </div>
      </div>

      <div class="col-12 col-sm-7">
        <table>
          <tr>
            <th>Name</th>
            <td>{{ user.fname }} {{ user.lname }}</td>
          </tr>
          <tr>
            <th>DOB</th>
            <td>{{ user.DOB }}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{{ user.title }}</td>
          </tr>
        </table>
      </div>
    </section>

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

export default {
  name: 'MyProfile',
  components: {
    appEditModal: EditModalVue,
    appError: ErrorVue,
    appEducationCard: EducationCardVue,
    appExperienceCard: ExperienceCardVue,
    appKnowledgeCard: KnowledgeCardVue,
    appSimpleValueCard: SimpleValueCardVue
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
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
.__avatar_wrapper,
.__avatar {
  width: 200px;
  height: 200px;
}

.__avatar {
  border-radius: 50%;
}
</style>
