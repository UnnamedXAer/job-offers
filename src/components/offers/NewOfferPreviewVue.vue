<template>
  <div class="row">
    <code>{{ stringOffer }}</code>

    <hr />
    <app-offer :offer="offer"> </app-offer>
  </div>
</template>

<script>
import OfferVue from '../offers/Offer.vue';
export default {
  components: {
    appOffer: OfferVue
  },
  props: {
    offer: Object
  },
  computed: {
    stringOffer() {
      console.log(this.offer);
      return JSON.stringify(this.offer, null, '\t');
    }
  }
};
</script>

<style>
</style>
