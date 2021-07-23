/** @typedef {{offers: [], loading: boolean, error: null | string}} StateType */

import { fetchLookupRecommendedOffers } from '../api/fetch';

/** @type {import('vuex').StoreOptions<StateType>} */
export const lookupRecommendedOffersStore = {
  state: () => ({
    offers: [],
    loading: false,
    error: null
  }),
  mutations: {
    fetchLookupRecommendedOffersStart(state) {
      state.error = null;
      state.loading = true;
    },
    fetchLookupRecommendedOffersSuccess(state, offers) {
      state.offers = offers;
      state.loading = false;
    },
    fetchLookupRecommendedOffersFail(state, errorMsg) {
      state.error = errorMsg;
      state.loading = false;
    }
  },

  actions: {
    async fetchLookupRecommendedOffers({ commit }) {
      const userId = 'my-user-id';
      try {
        const offers = await fetchLookupRecommendedOffers({ userId });
        commit('fetchLookupRecommendedOffersSuccess', offers);
      } catch (err) {
        commit('fetchLookupRecommendedOffersFail', err.message);
      }
    }
  }
};
