<template>
  <div id="lookup">
    <app-filter></app-filter>
    <div class="row mt-3">
      <app-error v-if="error">{{ error }}</app-error>
    </div>
    <app-recommended-offers
      v-if="showRecomended && recommendedOffers"
      :offers="recommendedOffers"
      :hide="hideRecomended"
      :active-offer-id="currentOfferId"
      :loading="loadingRecommended"
      :error="errorRecomended"
      @select-offer="setCurrentOffer"
    ></app-recommended-offers>

    <router-view></router-view>
  </div>
</template>

<script>
import ErrorVue from '../ui/alerts/Error.vue';
import FiltersVue from './Filters.vue';
import RecommendedOffersVue from './offers/RecommendedOffers.vue';
import CurrentOfferVue from './offers/CurrentOffer.vue';
import { fetchLookupRecommendedOffers } from './fetchLookupOffers';
import { fetchOffer } from '../offers/fetchOffer';

export default {
  components: {
    appFilter: FiltersVue,
    appError: ErrorVue,
    appRecommendedOffers: RecommendedOffersVue,
    appCurrentOffer: CurrentOfferVue
  },
  props: {
    user: { type: Object, reqiired: true }
  },
  data() {
    return {
      currentOfferId: null,
      currentOffer: null,
      loadingCurrentOffer: true,
      errorCurrentOffer: null,
      recommendedOffers: null,
      loadingRecommended: true,
      errorRecomended: null,
      showRecomended: true
    };
  },
  watch: {
    currentOfferId(val) {
      if (val !== null) {
        this.fetchOffer(val);
      }
    }
  },

  methods: {
    hideRecomended() {
      this.showRecomended = false;
    },
    setCurrentOffer(id) {
      this.currentOfferId = id;
    },
    async fetchOffer(id) {
      this.loadingCurrentOffer = true;
      this.errorCurrentOffer = null;
      try {
        const offer = await fetchOffer(id);
        this.currentOffer = offer;
      } catch (err) {
        this.errorCurrentOffer = err.message;
      }
      this.loadingCurrentOffer = false;
    },
    nextOffer() {
      if (this.recommendedOffers.length === 0) {
        this.currentOfferId = null;
        return;
      }

      let idx = this.recommendedOffers.findIndex(
        (x) => x.id === this.currentOfferId
      );

      if (idx === -1) {
        this.currentOfferId = null;
        return;
      }

      idx = idx < this.recommendedOffers.length - 1 ? idx + 1 : 0;
      this.currentOfferId = this.recommendedOffers[idx].id;
    },
    removeOffer(id) {
      const offerIdx = this.recommendedOffers.findIndex((x) => x.id === id);
      if (offerIdx === -1) {
        return;
      }

      this.recommendedOffers.splice(offerIdx, 1);
      if (this.recommendedOffers.length === 0) {
        this.currentOfferId = null;
        this.currentOffer = null;
      } else if (offerIdx >= this.recommendedOffers.length) {
        this.currentOfferId =
          this.recommendedOffers[this.recommendedOffers.length - 1].id;
      } else {
        this.currentOfferId = this.recommendedOffers[offerIdx].id;
      }
    },
    markOfferAsSeen(id) {
      const idx = this.recommendedOffers.findIndex((x) => x.id === id);
      if (idx !== -1) {
        this.recommendedOffers[idx].seenAt = new Date();
      }
    }
  },
  created() {
    this.error = null;
    this.loadingRecommended = true;
    fetchLookupRecommendedOffers(this.user.id)
      .then((offers) => {
        this.recommendedOffers = offers;
        this.currentOfferId =
          offers.length > 0 ? offers[offers.length - 1].id : null;
      })
      .catch((err) => {
        this.error = err.message;
      })
      .finally(() => {
        this.loadingRecommended = false;
      });
  }
};
</script>
<style>
</style>
