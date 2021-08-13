<template>
  <div class="row">
    <h1>{{ msg }}</h1>

    <div class="m-4 fs-5 d-flex flex-column">
      <template v-if="user">
        <h2>Hi {{ user.fname }} {{ user.lname }}!</h2>
      </template>
      <template v-else>
        <router-link class="mb-3" to="/login">Login me</router-link>
        <router-link class="mb-3" to="/registration">Register me</router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to job-offers'
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
