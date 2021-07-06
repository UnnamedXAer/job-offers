<template>
  <div class="container-lg">
    <div class="row">
      <app-navbar></app-navbar>
    </div>
    <div class="row">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarVue from './components/navbar/Navbar.vue';
export default {
  name: 'App',
  components: {
    appNavbar: NavbarVue
  }
};
</script>

<style>
</style>
