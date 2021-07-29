<template>
  <div class="">
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
        <div class="card card-body">
          <h5 class="card-title">Education</h5>
          <ul>
            <li
              class="mb-2"
              v-for="(edu, idx) in userDetails.educations"
              :key="idx"
            >
              <h6 class="card-text">
                {{ edu.school }}
              </h6>
              <p style="margin-block-end: 0">
                {{ edu.field }}
              </p>
              <small class="card-text text-secondary">
                {{ edu.start | format }} - {{ edu.end | format }}
              </small>
            </li>
          </ul>
        </div>
      </div>

      <div class="col">
        <div class="card card-body">
          <h5 class="card-title">Knowledge</h5>
          <ul>
            <li
              class="card-text"
              v-for="(know, idx) in userDetails.knowledge"
              :key="idx"
            >
              {{ know.name }} <small v-if="know.lv">{{ know.lv }}</small>
            </li>
          </ul>
        </div>
      </div>

      <div class="col">
        <div class="card card-body">
          <h5 class="card-title">Expirience</h5>
          <ul>
            <li
              class="card-text"
              v-for="(exp, idx) in userDetails.experience"
              :key="idx"
            >
              <h6>{{ exp.companyName }}</h6>
              <p style="margin-block-end: 0">
                {{ exp.position }}
              </p>
              <small class="card-text text-secondary">
                {{ exp.start | format }} -
                <span v-if="exp.end">{{ exp.end | format }}</span>
                <span v-else>currently</span>
              </small>
            </li>
          </ul>
        </div>
      </div>

      <div class="col">
        <div class="card card-body">
          <h5 class="card-title">Hobbies</h5>
          <ul>
            <li
              class="card-text"
              v-for="(hobby, idx) in userDetails.hobbies"
              :key="idx"
            >
              {{ hobby }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import format from 'date-fns/format';
import { mapState } from 'vuex';

export default {
  filters: {
    format: (val) => {
      if (!val || val === 'current') {
        return 'current';
      }
      return format(val, 'yyyy-MM-dd');
    }
  },
  name: 'MyProfile',
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      userDetails: (state) => state.auth.userDetails
    })
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
