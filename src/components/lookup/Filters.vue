<template>
  <div
    id="lookup-filters"
    class="row card card-body align-items-center px-0 mx-sm-1 mx-lg-0"
    style="background-color: inherit"
  >
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
          />
          <button class="btn btn-outline-secondary" type="button">
            <app-icon-geo></app-icon-geo>
          </button>
        </div>
      </div>
      <div class="col-lg-2">
        <button
          class="btn btn-outline-success btn-lg"
          type="button"
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
          />
        </div>
        <div class="col-lg-4">
          <label class="form-check-label" for="remote">Include Remote:</label>
          <input class="form-check-input" id="remote" type="checkbox" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeoVue from '../ui/icons/Geo.vue';
export default {
  components: {
    appIconGeo: GeoVue
  },
  data() {
    return {
      form: {
        keyword: '',
        location: ''
      }
    };
  },
  methods: {
    search() {}
  }
};
</script>

<style>
</style>
