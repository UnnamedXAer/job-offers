<template>
  <div>
    <app-navbar></app-navbar>
    <div class="container-lg">
      <div class="row"></div>
      <div class="row">
        <keep-alive include="NewOffer">
          <router-view :user="user" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarVue from './components/navbar/Navbar.vue';
export default {
  name: 'App',
  components: {
    appNavbar: NavbarVue
  },
  data() {
    return {
      user: {
        id: 'my-user-id'
      }
    };
  }
};
</script>

<style>
</style>
