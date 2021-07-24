<template>
  <div>
    <h1>My Offers</h1>

    <div class="card card-body">
      <div class="form-group mb-2">
        <label for="company-select" class="form-label">Change company</label>
        <select
          class="form-select form-select-lg"
          id="company-select"
          v-model="filters.selectedCompany"
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
      <div class="form-group mb-2 row">
        <label for="create-at-range" class="form-label">
          Created: date range
        </label>
        <div
          class="col input-group"
          style="min-width: 235px"
          id="create-at-range"
        >
          <label
            for="date-start"
            class="input-group-text"
            style="min-width: 63px"
          >
            From
          </label>
          <input
            id="date-start"
            name="date-start"
            class="form-control"
            :class="{ 'is-invalid': errors.dateStart !== null }"
            style="min-width: 120px"
            type="date"
            required
            v-model="filters.dateStart"
          />
        </div>
        <div
          class="col input-group"
          style="min-width: 235px"
          id="create-at-range"
        >
          <label
            for="date-end"
            class="input-group-text"
            style="min-width: 63px"
          >
            To
          </label>
          <input
            id="date-end"
            name="date-end"
            class="form-control"
            :class="{ 'is-invalid': errors.dateEnd !== null }"
            style="min-width: 120px"
            type="date"
            required
            v-model="filters.dateEnd"
          />
        </div>
        <div
          id="invalid-date-range"
          class="invalid-feedback"
          :style="{
            display:
              errors.dateStart !== null || errors.dateEnd !== null
                ? 'block'
                : 'none'
          }"
        >
          {{ errors.dateStart }}
          {{ errors.dateEnd }}
        </div>
      </div>

      <div class="form-check mb-2">
        <label for="show-expired" class="form-check-label">Show Expired</label>
        <input
          type="checkbox"
          name="show-expired"
          id="show-expired"
          class="form-check-input"
          v-model="filters.showExpired"
        />
      </div>
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
import format from 'date-fns/format';
import subMonths from 'date-fns/subMonths';
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
      filters: {
        selectedCompany: null,
        dateStart: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
        dateEnd: format(new Date(), 'yyyy-MM-dd'),
        showExpired: false
      },
      errors: {
        dateStart: null,
        dateEnd: null
      }
    };
  },
  watch: {
    'filters.selectedCompany'(val) {
      if (val) {
        this.fetchOffers();
      }
    },
    'filters.dateStart'(val) {
      this.$nextTick(this.validateDates(val, this.filters.dateEnd));
    },
    'filters.dateEnd'(val) {
      this.$nextTick(this.validateDates(this.filters.dateStart, val));
    },
    'filters.showExpired'(val) {
      this.fetchOffers();
    }
  },
  created() {
    this.fetchCompanies();
  },
  methods: {
    validateDates(start, end) {
      this.errors.dateStart = null;
      this.errors.dateEnd = null;
      if (!start) {
        this.errors.dateStart = 'Both dates are required.';
      }
      if (!end) {
        this.errors.dateEnd = !start ? '' : 'Both dates are required.';
        return;
      }
      if (Date.parse(start) > Date.parse(end)) {
        this.errors.dateStart = '"From" cannot be later than "To"';
        this.errors.dateEnd = '';
        return;
      }
      this.fetchOffers();
    },
    async fetchOffers() {
      const filters = { ...this.filters };

      this.loading = true;
      this.error = null;
      try {
        this.offers = await fetchUserOffers(this.user.id, filters);
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
          this.filters.selectedCompany = this.userCompanies[0].id;
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
