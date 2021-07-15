<template>
  <div class="mt-3 d-flex flex-column">
    <section class="list-group" v-if="offers.length" role="listbox">
      <app-user-offer-list-item
        v-for="offer in offers"
        :key="offer.id"
        :offer="offer"
      ></app-user-offer-list-item>
    </section>
    <div class="alert alert-info" v-else-if="!loading && !error">
      No Results.
    </div>
    <div
      class="spinner-border text-primary mx-auto"
      style="width: 4rem; height: 4rem; border-width: 0.4em"
      role="status"
      v-if="loading"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import UserOfferListItemVue from './UserOfferListItem.vue';
export default {
  components: {
    appUserOfferListItem: UserOfferListItemVue
  },
  props: {
    offers: Array,
    loading: Boolean,
    error: null
  }
};
</script>

<style>
</style>
