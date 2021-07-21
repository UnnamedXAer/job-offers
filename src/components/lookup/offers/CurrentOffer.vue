<template>
  <div class="d-flex flex-column mb-5 __offer">
    <app-error v-if="error">{{ error }}</app-error>
    <div class="position-relative">
      <div
        v-if="loading"
        class="
          position-absolute
          w-100
          h-100
          d-flex
          justify-content-center
          align-items-center
        "
        style="background-color: rgb(233 236 239 / 35%)"
      >
        <div
          class="spinner-border text-primary"
          style="width: 4rem; height: 4rem; border-width: 0.4em; display: block"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <app-offer :offer="offer"></app-offer>
    </div>

    <div class="position-sticky bottom-0 pb-2 __offer_actions">
      <!-- <div class="position-fixed bottom-0 pb-2 __offer_actions"> -->
      <app-rule class="mb-2"></app-rule>
      <div
        class="alert alert-danger alert-dismissible"
        role="alert"
        v-if="actionError"
      >
        {{ actionError }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="actionError = null"
        ></button>
      </div>
      <div class="d-flex flex-row justify-content-center align-items-center">
        <button
          class="btn btn-danger mx-1"
          style="min-width: 90px"
          :disabled="
            loading ||
            error !== null ||
            !offer ||
            offer.appliedAt ||
            offer.rejectedAt ||
            applying ||
            rejecting
          "
          @click="rejectOffer"
        >
          <span
            v-show="rejecting"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {{ offer.rejectedAt ? 'Rejected' : 'Reject' }}
        </button>
        <button
          class="btn btn-warning mx-1"
          style="min-width: 90px"
          :disabled="
            disabledNext ||
            loading ||
            error !== null ||
            !offer ||
            rejecting ||
            applying
          "
          @click="nextOffer"
        >
          Later
        </button>
        <button
          class="btn btn-primary btn-lg mx-3"
          style="min-width: 110px"
          :disabled="
            loading ||
            error !== null ||
            !offer ||
            offer.appliedAt ||
            offer.rejectedAt ||
            applying ||
            rejecting
          "
          @click="applyToOffer"
        >
          <span
            v-show="applying"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {{ offer.appliedAt ? 'Applied' : 'Apply' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FadeRuleVue from '../../ui/FadeRule.vue';
import firebaseAxios from '../../../axios/firebase';
import OfferVue from '../../offers/Offer.vue';
import ErrorVue from '../../ui/alerts/Error.vue';

export default {
  components: {
    appOffer: OfferVue,
    appRule: FadeRuleVue,
    appError: ErrorVue
  },
  props: {
    offer: {
      type: Object,
      required: true
    },
    disabledNext: Boolean,
    loading: Boolean,
    error: String
  },
  data() {
    return {
      applying: false,
      rejecting: false,
      actionError: null
    };
  },
  watch: {
    offer() {
      this.markOfferAsSeen();
    }
  },
  methods: {
    nextOffer() {
      this.$emit('next-offer');
    },
    markOfferAsSeen() {
      clearTimeout(this.markSeenTimeout);
      if (this.offer.seenAt) {
        return;
      }
      const id = this.offer.id;
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
          this.actionError = err.message || err.toString();
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
          this.actionError = err.message || err.toString();
        })
        .finally(() => {
          this.applying = false;
        });
    }
  },
  mounted() {
    this.markOfferAsSeen();
  },
  destroyed() {
    clearTimeout(this.markSeenTimeout);
  }
};
</script>

<style scoped>
.__offer {
  min-height: 5rem;
}
.__offer_actions {
  background-color: rgba(250, 250, 250, 0.7);
  background: rgb(207, 207, 207);
  background: radial-gradient(
    circle,
    rgb(238, 238, 238) 50%,
    rgba(207, 207, 207, 0.062) 100%
  );
}
</style>
