<template>
  <div class="">
    <h1>Hello {{ user.fname }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'MyProfile',
  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  },
  created: {}
};
</script>

<style scoped>
</style>
