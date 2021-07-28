<template>
  <div id="current-offer" class="d-flex flex-column mb-5">
    <app-error v-if="error">{{ error }}</app-error>
    <div>
      <div
        v-if="loading"
        class="
          position-relative
          w-100
          h-100
          d-flex
          justify-content-center
          align-items-center
          py-5
        "
      >
        <div
          class="spinner-border text-primary"
          style="width: 4rem; height: 4rem; border-width: 0.4em; display: block"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <h4>current ID: {{ offer && offer.id }}</h4>
      <h4>next ID: {{ nextOfferId }}</h4>

      <app-no-new-offers v-if="haveSeenAllNeOffers"></app-no-new-offers>

      <app-offer :offer="offer" v-if="offer" class="mb-5"></app-offer>

      <app-current-offer-actions
        :disabled="!offer || loading || error !== null"
        :actionError="actionError"
        :appliedAt="offer && offer.appliedAt"
        :rejectedAt="offer && offer.rejectedAt"
        :applying="applying"
        :rejecting="rejecting"
        :applyToOffer="applyToOffer"
        :rejectOffer="rejectOffer"
        :nextOffer="skipOffer"
        :disabledNext="nextOfferId === null"
      ></app-current-offer-actions>
    </div>
  </div>
</template>

<script>
import OfferVue from '../../offers/Offer.vue';
import ErrorVue from '../../ui/alerts/Error.vue';
import CurrentOfferActionsVue from './CurrentOfferActions.vue';
import NoNewOffersVue from './NoNewOffers.vue';
import { mapState } from 'vuex';

export default {
  components: {
    appOffer: OfferVue,
    appError: ErrorVue,
    appCurrentOfferActions: CurrentOfferActionsVue,
    appNoNewOffers: NoNewOffersVue
  },
  data() {
    return {
      applying: false,
      rejecting: false,
      actionError: null
    };
  },
  computed: {
    ...mapState({
      offer: (state) => state.lookup.currentOffer,
      loading: (state) => state.lookup.fetchingCurrentOffer,
      error: (state) => state.lookup.fetchCurrentOfferError,
      nextOfferId: (state) => state.lookup.nextOfferId,
      haveSeenAllNeOffers: (state) => state.lookup.haveSeenAllNeOffers
    })
  },
  watch: {
    offer(value) {
      this.markOfferAsSeen(value);
    },
    '$route.params.id'(value) {
      this.$store.commit('setCurrentOfferId', value);
      this.$store.dispatch('getCurrentOffer', value);
    }
  },
  methods: {
    markOfferAsSeen(offer) {
      clearTimeout(this.markSeenTimeout);
      if (!offer || offer.seenAt) {
        return;
      }
      const id = offer.id;
      this.markSeenTimeout = setTimeout(() => {
        if (!this.offer || this.offer.id !== id) {
          console.warn(
            'maker offer as seen: difference in ids',
            id,
            this.offer.id
          );
        }

        this.$store.dispatch('markOfferSeen', id);
      }, 1000);
    },
    async rejectOffer() {
      this.rejecting = true;
      try {
        await this.$store.dispatch('rejectOffer', this.offer.id);
        this.skipOffer();
      } catch (err) {
        this.actionError = err.message;
      }
      this.rejecting = false;
    },
    async applyToOffer() {
      this.applying = true;
      try {
        await this.$store.dispatch('applyToOffer', this.offer.id);
        this.skipOffer();
      } catch (err) {
        this.actionError = err.message;
      }
      this.applying = false;
    },
    skipOffer() {
      if (this.nextOfferId) {
        this.openOffer(this.nextOfferId);
        return;
      }

      this.$store.dispatch('fetchNextOffers').then(() => {
        this.openOffer(this.nextOfferId);
      });
    },
    openOffer(id) {
      if (id) {
        this.$router.push('/lookup/' + id);
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    if (
      this.$store.state.lookup.nextOffers.findIndex((x) => x.id === id) === -1
    ) {
      return this.$store
        .dispatch('fetchCurrentOffer', id)
        .then(() => this.$store.dispatch('setNextOfferId'));
    }
    this.$store.dispatch('getCurrentOffer', id);
  },
  mounted() {},
  destroyed() {
    clearTimeout(this.markSeenTimeout);
  }
};
</script>

<style scoped>
</style>
