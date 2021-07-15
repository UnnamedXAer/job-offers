<template>
  <div v-if="offer">
    <app-offer :offer="offer"> </app-offer>

    <div
      class="alert alert-success"
      role="alert"
      v-if="newOfferId || (offer && offer.id)"
    >
      <i class="bi bi-check-circle-fill me-2" style="font-size: 1.2em"></i> Your
      offer is created.
    </div>

    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <div class="d-flex justify-content-evenly mt-5">
      <button
        v-if="!newOfferId && offer && !offer.id"
        class="btn btn-outline-info btn-lg"
        :class="{ disabled: loading }"
        :disabled="loading"
        type="button"
        @click="showOfferForm"
      >
        Back
      </button>
      <button
        v-if="!newOfferId && !offer.id"
        class="btn btn-primary btn-lg"
        :class="{ disabled: loading }"
        :disabled="loading"
        type="button"
        @click="postOffer"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          v-if="loading"
        ></span>
        It's ok, post offer
        <span class="visually-hidden" v-if="loading">Loading...</span>
      </button>

      <button
        v-if="newOfferId || (offer && offer.id)"
        class="btn btn-outline-info btn-lg"
        type="button"
        @click="$router.push('/')"
      >
        Home
      </button>
    </div>
  </div>
  <div class="alert alert-warning" role="alert" v-else>
    <h4 class="alert-heading">Missing offer</h4>
    <p>
      You can go to
      <router-link :to="{ name: 'MyOffers' }" class="alert-link"
        >Your account</router-link
      >
      to see your offers,
      <router-link :to="{ name: 'CreateOffer' }" class="alert-link"
        >create new one</router-link
      >
      or
      <router-link :to="{ name: 'Lookup' }" class="alert-link"
        >browse</router-link
      >
      for a job in lookup.
    </p>
  </div>
</template>

<script>
import OfferVue from '../offers/Offer.vue';
import { postOffer } from './postOffer';
export default {
  components: {
    appOffer: OfferVue
  },
  props: {
    offer: Object
  },
  data() {
    return {
      loading: false,
      error: null,
      newOfferId: null
    };
  },
  computed: {
    stringOffer() {
      console.log(this.offer);
      return JSON.stringify(this.offer, null, '\t');
    }
  },
  methods: {
    async postOffer() {
      this.loading = true;
      this.error = true;
      try {
        this.newOfferId = await postOffer(this.offer);
      } catch (err) {
        this.error =
          'Could not post offer due to following error: ' + err.message ||
          err.toString();
      }
      this.loading = false;
    },
    showOfferForm() {
      this.$router.replace({ name: 'CreateOffer' });
    }
  }
};
</script>

<style>
</style>
