<template>
  <app-alert v-if="username">
    The user is alerady logged in. You are not
    <strong>{{ username }}</strong
    >?
    <router-link :to="{ name: 'Logout' }">Logout</router-link>
  </app-alert>
</template>

<script>
import AlertVue from '../ui/alerts/Alert.vue';

export default {
  components: {
    appAlert: AlertVue
  },
  props: {
    username: String
  }
};
</script>
