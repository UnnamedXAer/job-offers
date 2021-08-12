<template>
  <div class="row">
    <h1>{{ msg }}</h1>
    <div class="m-4 fs-5 d-flex flex-column">
      <router-link class="mb-3" to="/login">Login me</router-link>
      <router-link class="mb-3" to="/registration">Register me</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to job-offers'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
