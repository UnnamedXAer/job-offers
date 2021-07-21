<template>
  <div id="app" class="d-flex flex-column" style="min-height: 100vh">
    <app-navbar></app-navbar>
    <div class="container-lg flex-grow-1">
      <div class="row"></div>
      <div class="row">
        <keep-alive include="OfferForm">
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
