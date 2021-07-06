<template>
  <section class="">
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
      class="mt-3 d-flex __offers"
      role="link"
    >
      <div
        v-for="(offer, idx) in offers"
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
        :class="{ active: activeOfferIdx === idx }"
        @click="selectOffer(offer.id)"
      >
        <p class="text-primary text-center m-0">
          {{ offer.title /*+ offer.title*/ }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    offers: {
      type: Array,
      required: true
    },
    activeOfferIdx: Number,
    hide: {
      type: Function
    }
  },
  methods: {
    selectOffer(id) {
      this.$emit('select-offer', id);
    }
  }
};
</script>

<style scoped>
.__offers {
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
</style>
