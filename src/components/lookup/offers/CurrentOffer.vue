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
      <h3>next offer: {{ nextOfferId }}</h3>
      <h3>current offer: {{ offer && offer.id }}</h3>
      <div class="alert" v-if="haveSeenAllNeOffers">
        <span class="fs-3">🤯</span> Your have seen all new offers.
      </div>
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
        :disabledNext="1"
      ></app-current-offer-actions>
    </div>
  </div>
</template>

<script>
import firebaseAxios from '../../../axios/firebase';
import OfferVue from '../../offers/Offer.vue';
import ErrorVue from '../../ui/alerts/Error.vue';
import CurrentOfferActionsVue from './CurrentOfferActions.vue';
import { mapState } from 'vuex';

export default {
  components: {
    appOffer: OfferVue,
    appError: ErrorVue,
    appCurrentOfferActions: CurrentOfferActionsVue
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
      this.$store.dispatch('getCurrentOffer', value);
    }
  },
  methods: {
    markOfferAsSeen(offer) {
      console.log('about to mark', this.offer && this.offer.id);
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

        this.$store.commit('setSeenOffer', id);
        // firebaseAxios
        //   .put('/users-data/my-user-id/offers-seen/' + id + '.json', new Date())
        //   .then(() => {
        //     console.log('marked', id);
        //     this.$emit('offer-seen', id);
        //   })
        //   .catch((err) => {
        //     // nothing to do here for now.
        //     console.log('mark offer as seen: error:', err);
        //   });
      }, 1000);
    },
    rejectOffer() {
      this.rejecting = true;

      firebaseAxios
        .put(
          '/users-data/my-user-id/offers-rejected/' + this.offer.id + '.json',
          new Date()
        )
        .then(() => {
          this.$emit('remove-offer', this.offer.id);
        })
        .catch((err) => {
          this.actionError = err.message;
        })
        .finally(() => {
          this.rejecting = false;
        });
    },
    applyToOffer() {
      this.applying = true;

      firebaseAxios
        .put(
          '/users-data/my-user-id/offers-applied/' + this.offer.id + '.json',
          new Date()
        )
        .then(() => {
          this.$emit('remove-offer', this.offer.id);
        })
        .catch((err) => {
          this.actionError = err.message;
        })
        .finally(() => {
          this.applying = false;
        });
    },
    skipOffer() {
      this.$router.push('/lookup/' + (this.nextOfferId || ''));
    }
  },
  created() {
    this.$store.dispatch('fetchNextOffers');
  },
  mounted() {
    this.$store.dispatch('getCurrentOffer', this.$route.params.id);
  },
  destroyed() {
    clearTimeout(this.markSeenTimeout);
  }
};
</script>

<style scoped>
</style>
