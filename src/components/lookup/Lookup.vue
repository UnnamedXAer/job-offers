<template>
  <div class="container-lg">
    <app-filter></app-filter>
    <div class="row mt-3">
      <div
        class="spinner-border text-primary mx-auto"
        style="width: 4rem; height: 4rem; border-width: 0.4em"
        role="status"
        v-if="loading"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <app-error v-if="error">{{ error }}</app-error>
    </div>
    <app-offers
      v-if="showRecomended && offers"
      :offers="offers"
      :hide="hideRecomended"
      :active-offer-idx="currentOfferIdx"
      @select-offer="setCurrentOffer"
    ></app-offers>

    <section class="offer" v-if="currentOffer">
      <app-offer :offer="currentOffer"></app-offer>
    </section>
  </div>
</template>

<script>
import ErrorVue from '../ui/alerts/Error.vue';
import FiltersVue from './Filters.vue';
import OffersVue from './offers/Offers.vue';
import OfferVue from './offers/Offer.vue';
import firebaseAxios from '../../axios/firebase';

export default {
  components: {
    appFilter: FiltersVue,
    appError: ErrorVue,
    appOffers: OffersVue,
    appOffer: OfferVue
  },
  data() {
    return {
      currentOfferIdx: -1,
      offers: null,
      loading: true,
      error: null,
      showRecomended: true
    };
  },
  computed: {
    currentOffer() {
      if (this.currentOfferIdx === -1) {
        return null;
      }
      return this.offers[this.currentOfferIdx];
    }
  },
  methods: {
    hideRecomended() {
      this.showRecomended = false;
    },
    setCurrentOffer(id) {
      this.currentOfferIdx = this.offers.findIndex((x) => x.id === id);
    }
  },
  created() {
    this.error = null;
    this.loading = true;
    firebaseAxios
      .get('/offers.json')
      .then(({ data }) => {
        const offers = [];
        for (const id in data) {
          offers.push({
            ...data[id],
            id
          });
        }
        this.offers = offers;
        this.currentOfferIdx = offers.length - 1;
      })
      .catch((err) => {
        console.log('fetch offers: error:', err);
        this.error = err;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>
<style>
</style>
