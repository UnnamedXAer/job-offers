<template>
  <section id="recomended-offers" class="border-bottom">
    <app-error v-if="error">{{ error }}</app-error>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error }}
    </div>
    <div
      v-else-if="loading"
      class="spinner-border text-primary mx-auto"
      style="width: 3rem; height: 3rem; border-width: 0.4em; display: block"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
      <div class="d-flex justify-content-between">
        <h6>Recomended</h6>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="hide"
        ></button>
      </div>
      <div
        class="mt-3 d-flex justify-content-center __recommended-offers"
        role="link"
      >
        <p
          class="text-muted fw-light"
          v-if="!loading && error === null && offers.length === 0"
        >
          No recomendations found
        </p>
        <router-link
          v-for="offer in offers"
          :key="offer.id"
          class="
            __offer
            card
            mx-2
            p-1
            mb-2
            d-flex
            justify-content-center
            align-items-center
            user-select-none
          "
          :class="{
            active: activeOfferId === offer.id,
            __seen: seenOffers.includes(offer.id),
            __applied: appliedOffers.includes(offer.id),
            __rejected: rejectedOffers.includes(offer.id)
          }"
          :to="'/lookup/' + offer.id"
        >
          <p class="text-primary text-center m-0">
            {{ offer.title }}
          </p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import ErrorVue from '../../ui/alerts/Error.vue';

export default {
  components: {
    appError: ErrorVue
  },
  props: {
    offers: {
      type: Array,
      required: true
    },
    activeOfferId: String,
    hide: Function,
    loading: Boolean,
    error: String
  },
  computed: {
    seenOffers() {
      return this.$store.state.lookup.seenOffers;
    },
    appliedOffers() {
      return this.$store.state.lookup.appliedOffers;
    },
    rejectedOffers() {
      return this.$store.state.lookup.rejectedOffers;
    }
  }
};
</script>

<style scoped>
#recomended-offers {
  min-height: 110px;
}

.__recommended-offers {
  overflow-x: auto;
  max-height: 7rem;
}

.__offer {
  width: 160px !important;
  max-height: 100%;
  cursor: pointer;
  flex-shrink: 0;
}

.__offer:hover,
.__offer.active {
  background-color: var(--bs-light);
  border-color: var(--bs-gray);
}

.__offer:first-of-type {
  margin-left: 0 !important;
}
.__offer:last-of-type {
  margin-right: 0 !important;
}

.__seen {
  position: relative;
}

.__seen::before {
  position: absolute;
  top: 0;
  left: 0;
  content: '👀';
}

.__applied::after {
  position: absolute;
  top: 0;
  right: 0;
  content: '📋';
  border-color: tomato;
}
.__rejected::after {
  position: absolute;
  top: 0;
  right: 0;
  content: '🗑';
  border-color: tomato;
}
</style>
