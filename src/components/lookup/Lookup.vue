<template>
  <div>
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
      <app-offer
        :offer="currentOffer"
        :disabled-next="offers.length === 0"
        @next-offer="nextOffer"
        @offer-seen="markOfferAsSeen"
        @remove-offer="removeOffer"
      ></app-offer>
    </section>
  </div>
</template>

<script>
import ErrorVue from '../ui/alerts/Error.vue';
import FiltersVue from './Filters.vue';
import OffersVue from './offers/Offers.vue';
import OfferVue from './offers/Offer.vue';
import firebaseAxios from '../../axios/firebase';

import { createDumbOffers } from '../../data_dev/offers_data';

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
    },
    nextOffer() {
      if (this.offers.length === 0) {
        this.currentOfferIdx = -1;
        return;
      }
      if (this.currentOfferIdx < this.offers.length - 1) {
        this.currentOfferIdx++;
        return;
      }
      this.currentOfferIdx = 0;
    },
    removeOffer(id) {
      const offerIdx = this.offers.findIndex((x) => x.id === id);
      if (offerIdx === -1) {
        return;
      }

      this.offers.splice(offerIdx, 1);

      if (this.currentOfferIdx >= this.offers.length) {
        this.currentOfferIdx = this.offers.length - 1;
      }
    },
    markOfferAsSeen(id) {
      const idx = this.offers.findIndex((x) => x.id === id);
      if (idx !== -1) {
        this.offers[idx].seenAt = new Date();
      }
    }
  },
  created() {
    this.loading = false;

    this.error = null;
    this.loading = true;
    firebaseAxios
      .get('/offers.json')
      .then(({ data }) => {
        const offers = [];
        for (const id in data) {
          offers.push({
            ...data[id],
            id,
            seenAt: data[id].seenAt || null
          });
        }
        this.offers = offers;
        this.currentOfferIdx = offers.length - 1;

        if (offers.length === 0 && process.env.NODE_ENV !== 'production') {
          createDumbOffers();
        }
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
