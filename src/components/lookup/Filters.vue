<template>
  <div>
    <div
      id="lookup-filters"
      class="row card card-body align-items-center px-0 mx-sm-1 mx-lg-0"
      style="background-color: inherit"
    >
      <form @submit.prevent="search">
        <div class="row align-items-center px-0">
          <div class="col-lg-2">
            <h2 style="width: 100%; text-align: end">Search</h2>
          </div>
          <div class="col-lg-4">
            <input
              id="keyword"
              type="text"
              class="form-control-lg"
              placeholder="role, company, keyword"
              style="width: 100%"
              v-model.lazy.trim="form.keyword"
            />
          </div>
          <div class="col-lg-4">
            <div class="input-group" style="flex-wrap: unset">
              <input
                id="location"
                type="text"
                class="form-control-lg"
                placeholder="location"
                style="width: 100%"
                v-model.lazy.trim="form.location"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="getCurrentLocation"
              >
                <app-icon-geo></app-icon-geo>
              </button>
            </div>
          </div>
          <div class="col-lg-2">
            <button
              class="btn btn-outline-success btn-lg"
              type="submit"
              style="width: 100%"
            >
              🔎 Search
            </button>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="collapse multi-collapse gy-2">
            <div class="col-lg-4">
              <input
                class="form-control"
                id="offer-age"
                type="number"
                min="1"
                max="30"
                placeholder="From last days"
                style="width: 100%"
                v-model.lazy.number="form.daysBack"
              />
            </div>
            <div class="col-lg-4">
              <label class="form-check-label" for="remote"
                >Include Remote:</label
              >
              <input
                class="form-check-input"
                id="remote"
                type="checkbox"
                v-model="form.remote"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="row mt-3">
      <app-error v-if="fetchError || error" :dismiss="dismissErrors">{{
        fetchError || error
      }}</app-error>
    </div>
  </div>
</template>

<script>
import GeoVue from '../ui/icons/Geo.vue';
import { getCurrentLocation } from '../../helpers/location.js';
import ErrorVue from '../ui/alerts/Error.vue';

export default {
  components: {
    appIconGeo: GeoVue,
    appError: ErrorVue
  },
  data() {
    return {
      form: {
        keyword: '',
        location: '',
        daysBack: 30,
        remote: true
      },
      error: null
    };
  },
  computed: {
    fetchError() {
      return this.$store.state.lookup.fetchNextOffersError;
    }
  },
  methods: {
    search() {
      this.$store.commit('setFilters', { ...this.form });
      this.$store.dispatch('fetchNextOffers');
    },
    async getCurrentLocation() {
      this.error = null;
      getCurrentLocation()
        .then((loc) => {
          this.form.location = loc.name;
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    dismissErrors() {
      this.error = null;
      this.$store.commit('setFetchNextOffersError', null);
    }
  }
};
</script>

<style>
</style>
