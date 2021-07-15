<template>
  <div>
    <h1>My Offers</h1>

    <div class="card card-body">
      <label for="company-select" class="form-label">Change company</label>
      <select
        class="form-select form-select-lg"
        id="company-select"
        v-model="selectedCompany"
      >
        <option
          v-for="company in userCompanies"
          :key="company.id"
          :value="company.id"
        >
          {{ company.name }}
        </option>
      </select>
    </div>

    <div
      class="alert alert-danger alert-dismissible position-sticky"
      style="top: 1rem; z-index: 1"
      v-if="error"
    >
      {{ error }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="error = null"
      ></button>
    </div>
    <app-user-offers-list
      :offers="offers"
      :loading="loading"
    ></app-user-offers-list>
  </div>
</template>

<script>
import { fetchUserOffers } from './fetchUserOffers';
import { fetchUserCompanies } from './fetchUserCompanies';
import UserOfferListVue from './UserOfferList.vue';
export default {
  components: {
    appUserOffersList: UserOfferListVue
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      loadingCompanies: true,
      error: null,
      offers: [],
      userCompanies: [],
      selectedCompany: null
    };
  },
  watch: {
    selectedCompany(val) {
      if (val) {
        this.fetchOffers(val);
      }
    }
  },
  created() {
    this.fetchCompanies();
  },
  methods: {
    async fetchOffers(company) {
      this.loading = true;
      this.error = null;
      try {
        this.offers = await fetchUserOffers(this.user.id, company);
      } catch (err) {
        this.error =
          'We could not fetch your offers due to following reason: ' +
          (err.message || err.toString());
      }
      this.loading = false;
    },
    async fetchCompanies() {
      this.loadingCompanies = true;
      this.error = null;
      try {
        this.userCompanies = await fetchUserCompanies(this.user.id);
        if (this.userCompanies.length > 0) {
          this.selectedCompany = this.userCompanies[0].id;
        }
      } catch (err) {
        this.error =
          'We could not fetch your companies due to following error: ' +
          (err.message || err.toString());
      }
      this.loadingCompanies = false;
    }
  }
};
</script>

<style>
</style>
