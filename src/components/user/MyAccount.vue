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

    <section class="row row-cols-1 row-cols-md-2 g-4" v-if="userDetails">
      <div class="col">
        <div class="card card-body __editable_card">
          <h5 class="card-title">Education</h5>
          <ul>
            <li
              class="card-text __record"
              v-for="(edu, idx) in userDetails.educations"
              :key="idx"
            >
              <button class="__pen" @click="edit('educations', idx)">
                <i class="bi bi-pen"></i>
              </button>
              <h6>
                {{ edu.school }}
              </h6>
              <p style="margin-block-end: 0">
                {{ edu.field }}
              </p>
              <small class="text-secondary">
                {{ edu.start | format }} - {{ edu.end | format }}
              </small>
            </li>
          </ul>
        </div>
      </div>

      <div class="col">
        <div class="card card-body __editable_card">
          <h5 class="card-title">Knowledge</h5>
          <ul>
            <li
              class="card-text __record __record_text"
              v-for="(know, idx) in userDetails.knowledge"
              :key="idx"
            >
              <button class="__pen" @click="edit('knowledge', idx)">
                <i class="bi bi-pen"></i>
              </button>
              {{ know.name }} <small v-if="know.lv">{{ know.lv }}</small>
            </li>
          </ul>
        </div>
      </div>

      <div class="col">
        <div class="card card-body __editable_card">
          <h5 class="card-title">Expirience</h5>
          <ul>
            <li
              class="card-text __record"
              v-for="(exp, idx) in userDetails.experience"
              :key="idx"
            >
              <button class="__pen" @click="edit('experience', idx)">
                <i class="bi bi-pen"></i>
              </button>
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
          </ul>
        </div>
      </div>

      <div class="col">
        <div class="card card-body __editable_card">
          <h5 class="card-title">Hobbies</h5>
          <ul>
            <li
              class="card-text __record __record_text"
              v-for="(hobby, idx) in userDetails.hobbies"
              :key="idx"
            >
              <button class="__pen" @click="edit('hobbies', idx)">
                <i class="bi bi-pen"></i>
              </button>
              {{ hobby }}
            </li>
          </ul>
        </div>
      </div>

      <!--  -->
    </section>
  </div>
</template>

<script>
import format from 'date-fns/format';
import { mapState } from 'vuex';
import EditModalVue from './editModal/EditModal.vue';

export default {
  name: 'MyProfile',
  components: {
    appEditModal: EditModalVue
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      userDetails: (state) => state.auth.userDetails,
      editedField: (state) => state.auth.editUserDetails.editedField
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
    edit(fieldName, idx) {
      this.$store.dispatch('setUserDetailEditedField', { fieldName, idx });
    },
    clearEditing() {
      this.$store.dispatch('setUserDetailEditedField', null);
    },
    async saveField() {
      await this.$store.dispatch('saveUserDetailForm');
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

.__pen {
  display: none;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 1rem;
}
.__record_text .__pen {
  top: 0;
}

.__record {
  position: relative;
  min-height: 32px;
  margin-bottom: 0.5rem;
}

.__record_text {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-bottom: 0;
}

.__record::marker {
  display: block;
  height: 100%;
  background-color: aquamarine;
  color: violet;
}

.__record:hover {
  background-color: rgb(248, 248, 248);
}

.__record:hover .__pen {
  display: block;
}
</style>
