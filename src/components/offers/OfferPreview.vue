<template>
  <div v-if="fetchedOffer">
    <app-offer :offer="fetchedOffer"> </app-offer>

    <div class="alert alert-success" role="alert" v-if="alertMessage">
      <i class="bi bi-check-circle-fill me-2" style="font-size: 1.2em"></i>
      {{ alertMessage }}
    </div>

    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <div class="d-flex justify-content-evenly mt-5">
      <button
        v-if="!isNewOffer"
        class="btn btn-outline-info btn-lg"
        :class="{ disabled: loading }"
        :disabled="loading"
        type="button"
        @click="$router.go(-1)"
      >
        Back
      </button>
      <button
        class="btn btn-outline-info btn-lg"
        :class="{
          disabled: loading,
          'text-muted': alreadyExpired
        }"
        :disabled="loading || alreadyExpired"
        type="button"
        @click="showOfferForm"
        :title="alreadyExpired ? 'Offer already expired' : ''"
      >
        Edit
      </button>
      <button
        v-if="!isNewOffer && offer && !offer.id"
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
        v-if="
          isNewOffer || (fetchedOffer && fetchedOffer.id) || $route.params.id
        "
        class="btn btn-outline-info btn-lg"
        type="button"
        @click="$router.push('/')"
      >
        Home
      </button>
    </div>
  </div>
  <div
    class="alert alert-warning"
    role="alert"
    v-else-if="error !== null && !loading"
  >
    <h4 class="alert-heading">Missing offer</h4>
    <p>
      You can go to
      <router-link :to="{ name: 'UserOffers' }" class="alert-link"
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
import isBefore from 'date-fns/isBefore';
import { fetchOffer } from './fetchOffer';
import OfferVue from './Offer.vue';
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
      loading: true,
      error: null,
      fetchedOffer: null
    };
  },
  computed: {
    isNewOffer() {
      return this.$route.query.create === 'success';
    },
    alreadyExpired() {
      return isBefore(this.fetchedOffer.expiresAt, new Date());
    },
    alertMessage() {
      if (this.$route.query.update === 'success') {
        return 'Your offer is updated';
      }
      if (this.$route.query.create === 'success') {
        return 'Your offer is created.';
      }

      return null;
    }
  },
  methods: {
    async postOffer() {
      this.loading = true;
      this.error = true;
      try {
        const id = await postOffer(this.offer);
        this.fetchedOffer = Object.assign({ id }, this.offer);
      } catch (err) {
        this.error =
          'Could not post offer due to following error: ' + err.message ||
          err.toString();
      }
      this.loading = false;
    },
    showOfferForm() {
      if (this.$route.params.id) {
        this.$router.push({
          name: 'EditOffer',
          params: { id: this.$route.params.id }
        });
        return;
      }
      this.$router.replace({
        name: 'CreateOffer'
      });
    }
  },
  created() {
    if (this.$route.params.offer) {
      this.fetchedOffer = this.offer;
      this.loading = false;
      return;
    }
    fetchOffer(this.$route.params.id)
      .then((offer) => {
        this.fetchedOffer = offer;
      })
      .catch((err) => {
        this.error =
          'Could not fetch the offer due to following error: ' +
          (err.message || err.toString());
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style>
</style>
