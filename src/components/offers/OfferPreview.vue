<template>
  <div
    class="alert alert-warning"
    role="alert"
    v-if="error !== null && !loading"
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
  <div class="mb-5" v-else-if="fetchedOffer">
    <app-offer :offer="fetchedOffer"> </app-offer>

    <div class="alert alert-success" role="alert" v-if="alertMessage">
      <i class="bi bi-check-circle-fill me-2" style="font-size: 1.2em"></i>
      {{ alertMessage }}
    </div>

    <div class="alert alert-danger" v-if="error" id="offer-preview-error">
      {{ error }}
    </div>

    <div class="row __actions">
      <div class="col-12" :class="actionColClass">
        <button
          class="btn btn-outline-info btn-lg"
          :class="{ disabled: loading }"
          :disabled="loading"
          type="button"
          @click="backHandler"
        >
          Back
        </button>
      </div>
      <div class="col-12" :class="actionColClass" v-if="isSavedOffer">
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
      </div>
      <div class="col-12" :class="actionColClass" v-if="isSavedOffer">
        <button
          class="btn btn-outline-info btn-lg"
          type="button"
          @click="$router.push('/')"
        >
          Home
        </button>
      </div>
      <div class="col-12" :class="actionColClass" v-if="canSave">
        <button
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
          <span class="visually-hidden" v-if="loading">Loading...</span>
          <span style="font-size: 0.8em"
            >It's ok, {{ isSavedOffer ? 'update' : 'post' }} offer</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import isBefore from 'date-fns/isBefore';
import { fetchOffer } from './fetchOffer';
import OfferVue from './Offer.vue';
import { postOffer } from './postOffer';
import { mockedCompanies } from '../../data_dev/mocked';
import { updateOffer } from './updateOffer';
export default {
  components: {
    appOffer: OfferVue
  },
  props: {
    offer: Object,
    id: String
  },
  data() {
    return {
      loading: true,
      error: null,
      fetchedOffer: null
    };
  },
  computed: {
    canSave() {
      return !!this.offer;
    },
    isSavedOffer() {
      return this.id !== 'new';
    },
    isNewlyCreatedOffer() {
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
    },
    actionColClass() {
      if (!this.isSavedOffer) {
        return 'col-sm-6';
      }
      if (this.canSave) {
        return 'col-sm-3';
      }
      return 'col-sm-4';
    }
  },
  methods: {
    async postOffer() {
      this.loading = true;
      this.error = null;

      if (this.isSavedOffer) {
        try {
          const id = await updateOffer(this.id, this.offer);
          this.$router.replace({
            name: 'OfferPreview',
            params: { id },
            query: {
              update: 'success'
            }
          });
        } catch (err) {
          this.error =
            'Could not update offer due to following error: ' + err.message;
        }
        this.loading = false;
        return;
      }

      try {
        const id = await postOffer(this.offer);
        this.$router.replace({
          name: 'OfferPreview',
          params: { id },
          query: {
            create: 'success'
          }
        });
      } catch (err) {
        this.error =
          'Could not post offer due to following error: ' + err.message;
      }
      this.loading = false;
    },
    showOfferForm() {
      if (this.isSavedOffer) {
        return this.$router.push({
          name: 'EditOffer',
          params: { id: this.id }
        });
      }
      this.$router.replace({
        name: 'CreateOffer'
      });
    },
    backHandler() {
      if (this.isNewlyCreatedOffer) {
        return this.$router.replace({ name: 'CreateOffer' });
      }
      this.$router.go(-1);
    }
  },
  created() {
    if (this.offer) {
      this.fetchedOffer = {
        ...this.offer,
        company: mockedCompanies.find((x) => x.id === this.offer.company)
      };
      this.loading = false;
      return;
    }
    fetchOffer(this.id)
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

<style scoped>
.__actions > div {
  display: flex;
  justify-content: center;
}

.__actions > div > button {
  width: 100%;
  max-width: 500px;
}
</style>
