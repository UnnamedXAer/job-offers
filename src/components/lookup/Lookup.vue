<template>
  <div class="container-lg">
    <app-filter></app-filter>
  </div>
</template>

<script>
import FiltersVue from './Filters.vue';
export default {
  components: {
    appFilter: FiltersVue,
  },
};
</script>

<style>
</style>
