<template>
  <div id="current-offer" class="d-flex flex-column mb-5">
    <app-error v-if="error" class="mt-3">{{ error }}</app-error>

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

      <app-no-new-offers v-if="haveSeenAllNeOffers"></app-no-new-offers>

      <app-offer
        class="mb-5"
        :offer="offer"
        v-if="offer"
        :applied="applied"
        :rejected="rejected"
      ></app-offer>

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
        :actionResult="actionResultMsg"
        :dismissActionResultAlert="dismissActionResultAlert"
        :applied="applied"
        :rejected="rejected"
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
      actionError: null,
      actionResultMsg: null
    };
  },
  computed: {
    ...mapState({
      offer: (state) => state.lookup.currentOffer,
      loading: (state) => state.lookup.fetchingCurrentOffer,
      error: (state) => state.lookup.fetchCurrentOfferError,
      nextOfferId: (state) => state.lookup.nextOfferId,
      haveSeenAllNeOffers: (state) => state.lookup.haveSeenAllNeOffers,
      applied: (state) => {
        return (
          state.lookup.currentOffer &&
          (state.lookup.currentOffer.appliedAt ||
            state.lookup.appliedOffers.includes(state.lookup.currentOffer.id))
        );
      },
      rejected: (state) => {
        return (
          state.lookup.currentOffer &&
          (state.lookup.currentOffer.rejectedAt ||
            state.lookup.rejectedOffers.includes(state.lookup.currentOffer.id))
        );
      }
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
        this.$store.dispatch('markOfferSeen', id);
      }, 1000);
    },

    async rejectOffer() {
      this.actionResultMsg = null;
      this.rejecting = true;

      try {
        await this.$store.dispatch('rejectOffer', this.offer.id);
        this.setActionResultMsg('Rejected :(', 'info');
        this.skipOffer();
      } catch (err) {
        this.setActionResultMsg(err.message, 'danger');
      }
      this.rejecting = false;
    },

    async applyToOffer() {
      this.actionResultMsg = null;
      this.applying = true;

      try {
        await this.$store.dispatch('applyToOffer', this.offer.id);
        this.setActionResultMsg('Accepted :) 👌🏼', 'success');

        this.skipOffer();
      } catch (err) {
        this.setActionResultMsg(err.message, 'danger');
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
    },
    setActionResultMsg(msg, lv) {
      this.actionResultMsg = { msg, level: lv };
      this.actionSuccessMsgTimeout = setTimeout(
        this.dismissActionResultAlert,
        3000
      );
    },
    dismissActionResultAlert() {
      clearTimeout(this.actionSuccessMsgTimeout);
      delete this.actionSuccessMsgTimeout;
      this.actionResultMsg = null;
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
