<template>
  <div id="app" class="d-flex flex-column" style="min-height: 100vh">
    <app-navbar></app-navbar>
    <div class="container-lg flex-grow-1">
      <div class="row"></div>
      <div class="row">
        <keep-alive include="OfferForm">
          <router-view />
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
  created() {
    this.$store.dispatch('tryAutologin');
  }
};
</script>

<style>
</style>
