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

      <!-- <app-details-card card-title="Knowledge" name="knowledge" @add="add">
        <li
          class="card-text __record __record_text"
          v-for="(know, idx) in userDetails.knowledge"
          :key="idx"
        >
          <app-record-actions
            :idx="idx"
            name="knowledge"
            @remove="remove"
            @edit="edit"
          ></app-record-actions>
          {{ know.name }} <small v-if="know.lv">{{ know.lv }}</small>
        </li>
      </app-details-card>

      <app-details-card card-title="Experience" name="experience" @add="add">
        <li
          class="card-text __record"
          v-for="(exp, idx) in userDetails.experience"
          :key="idx"
        >
          <app-record-actions
            :idx="idx"
            name="experience"
            @remove="remove"
            @edit="edit"
          ></app-record-actions>
          <h6>{{ exp.company }}</h6>
          <p style="margin-block-end: 0">
            {{ exp.position }}
          </p>
          <small class="text-secondary">
            {{ exp.start | format }} -
            <span v-if="exp.end">{{ exp.end | format }}</span>
            <span v-else>currently</span>
          </small>
        </li>
      </app-details-card>

      <app-details-card
        card-title="Hobbies"
        name="hobbies"
        @add="add"
        isSimpleValue
      >
        <li
          class="card-text __record __record_text"
          v-for="(hobby, idx) in userDetails.hobbies"
          :key="idx"
        >
          <app-record-actions
            :idx="idx"
            name="hobby"
            isSimpleValue
            @remove="remove"
            @edit="edit"
          ></app-record-actions>
          {{ hobby }}
        </li>
      </app-details-card> -->

      <!--  -->
    </section>
  </div>
</template>

<script>
import format from 'date-fns/format';
import { mapState } from 'vuex';
import EditModalVue from './editModal/EditModal.vue';
import ErrorVue from '../ui/alerts/Error.vue';
import EducationCardVue from './detailsCards/EducationCard.vue';
import ExperienceCardVue from './detailsCards/ExperienceCard.vue';

export default {
  name: 'MyProfile',
  components: {
    appEditModal: EditModalVue,
    appError: ErrorVue,
    appEducationCard: EducationCardVue,
    appExperienceCard: ExperienceCardVue
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
  filters: {
    format: (val) => {
      if (val instanceof Date) {
        return format(val, 'yyyy-MM-dd');
      }

      return val;
    }
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
