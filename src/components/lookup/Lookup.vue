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
import { mapState } from 'vuex';

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
      error: null,
      showRecomended: true
    };
  },
  computed: {
    ...mapState({
      recommendedOffers: (state) => state.lookup.recommended.offers,
      loadingRecommended: (state) => state.lookup.recommended.loading,
      errorRecomended: (state) => state.lookup.recommended.error
    })
  },
  methods: {
    hideRecomended() {
      this.showRecomended = false;
    }
  },
  created() {
    this.$store.dispatch('fetchLookupRecommendedOffers');
  }
};
</script>
<style>
</style>
