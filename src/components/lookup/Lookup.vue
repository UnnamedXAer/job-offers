<template>
  <div id="lookup">
    <app-filter></app-filter>
    <div class="row mt-3">
      <app-error v-if="error">{{ error }}</app-error>
    </div>
    <app-recommended-offers
      v-if="showRecomended"
      :offers="recommendedOffers"
      :hide="hideRecomended"
      :active-offer-id="$route.params.id"
      :loading="loadingRecommended"
      :error="errorRecomended"
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
      recommendedOffers: [],
      loadingRecommended: true,
      errorRecomended: null,
      showRecomended: true
    };
  },
  watch: {},

  methods: {
    hideRecomended() {
      this.showRecomended = false;
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
