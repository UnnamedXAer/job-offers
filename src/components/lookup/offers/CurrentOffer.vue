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
        :nextOffer="nextOffer"
        :disabledNext="1"
      ></app-current-offer-actions>
    </div>
  </div>
</template>

<script>
import firebaseAxios from '../../../axios/firebase';
import { fetchOffer } from '../../offers/fetchOffer';
import OfferVue from '../../offers/Offer.vue';
import ErrorVue from '../../ui/alerts/Error.vue';
import CurrentOfferActionsVue from './CurrentOfferActions.vue';

export default {
  components: {
    appOffer: OfferVue,
    appError: ErrorVue,
    appCurrentOfferActions: CurrentOfferActionsVue
  },
  data() {
    return {
      offer: null,
      loading: true,
      error: null,
      applying: false,
      rejecting: false,
      actionError: null
    };
  },
  watch: {
    offer(value) {
      this.markOfferAsSeen(value);
    },
    '$route.params.id'() {
      this.fetchOffer(this.$route.params.id);
    }
  },
  methods: {
    async fetchOffer(id) {
      if (!id) {
        this.error = 'Missing offer ID';
        return;
      }

      this.loading = true;
      this.error = null;
      clearTimeout(this.markSeenTimeout);

      try {
        const offer = await fetchOffer(id);
        this.offer = offer;
        this.loading = false;
      } catch (err) {
        this.error = err.message;
      }
    },
    nextOffer() {
      //   this.$emit('next-offer');
    },
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

        firebaseAxios
          .put('/users-data/my-user-id/offers-seen/' + id + '.json', new Date())
          .then(() => {
            console.log('marked', id);
            this.$emit('offer-seen', id);
          })
          .catch((err) => {
            // nothing to do here for now.
            console.log('mark offer as seen: error:', err);
          });
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
          // this.error = 'Could not reject the offer, please refresh page and try again.';
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
          // this.error = 'Could not accept the offer, please refresh page and try again.';
          this.actionError = err.message;
        })
        .finally(() => {
          this.applying = false;
        });
    }
  },
  mounted() {
    this.fetchOffer(this.$route.params.id);
  },
  destroyed() {
    clearTimeout(this.markSeenTimeout);
  }
};
</script>

<style scoped>
</style>
