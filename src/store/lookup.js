// eslint-disable-next-line no-unused-vars
import { Store } from 'vuex';
import { fetchOffer, fetchNextOffers } from './api/fetch';

export const lookupConfig = {
  nextOffersBatchSize: 10,
  minNextOffers: 3
};

const initialState = {
  nextOffersOffset: 0,
  fetchingNextOffers: false,
  fetchingNextOffersError: null,
  nextOffers: [],
  fetchingCurrentOffer: false,
  fetchCurrentOfferError: null,
  currentOffer: null,
  nextOfferId: null,
  seenOffers: [],
  haveSeenAllNeOffers: false
};

/** @type {Store<initialState>} */
export const store = {
  state: { ...initialState, nextOffers: [...initialState.nextOffers] },
  mutations: {
    fetchCurrentOfferStart(state) {
      state.fetchCurrentOfferError = null;
      state.fetchingCurrentOffer = true;
    },
    fetchCurrentOfferSuccess(state, offer) {
      state.currentOffer = offer;
      state.fetchingCurrentOffer = false;
      state.fetchCurrentOfferError = null;

      state.nextOffers = state.nextOffers.filter(x => x.id !== offer.id);
    },
    fetchCurrentOfferFail(state, errorMsg) {
      state.fetchCurrentOfferError = errorMsg;
    },
    fetchNextOffersStart(state) {
      state.nextOffersOffset += lookupConfig.nextOffersBatchSize;
      state.fetchNextOffersError = null;
      state.fetchingNextOffers = true;
    },
    fetchNextOffersSuccess(state, offers) {
      if (offers.length === 0) {
        // start from 0 as we do not have more offers :(
        // or mb show user the alert and then rest it?
        state.haveSeenAllNeOffers = true;
        state.nextOffersOffset = 0;
      }
      state.nextOffers = state.nextOffers.concat(offers);
      state.fetchingNextOffers = false;
    },
    fetchNextOffersFail(state, errorMsg) {
      state.nextOffersOffset -= lookupConfig.nextOffersBatchSize;
      state.fetchNextOffersError = errorMsg;
    },
    removeOfferFromNext(state, id) {
      state.nextOffers = state.nextOffers.filter(x => x.id !== id);
    },
    setNextOfferId(state, id) {
      state.nextOfferId = id;
    },
    setSeenOffer(state, id) {
      state.seenOffers = state.seenOffers.concat(id);
    }
  },
  actions: {
    getCurrentOffer({ dispatch, commit, state }, id) {
      const offer = state.nextOffers.find(x => x.id === id);
      dispatch('setNextOfferId', id);
      if (offer) {
        commit('fetchCurrentOfferSuccess', offer);
        return;
      }
      dispatch('fetchCurrentOffer', id);
    },

    async fetchCurrentOffer({ commit }, id) {
      if (!id) {
        commit('fetchCurrentOfferFail', 'Missing offer ID');
        return;
      }

      commit('fetchCurrentOfferStart');

      try {
        const offer = await fetchOffer(id);
        commit('fetchCurrentOfferSuccess', offer);
      } catch (err) {
        commit('fetchCurrentOfferFail', err.message);
      }
    },

    setNextOfferId({ commit, dispatch, state }, currentOfferId) {
      if (state.nextOfferId && currentOfferId !== state.nextOfferId) {
        console.log('unnecessary call to set next offer id');
        return;
      }
      const nextOffer = state.nextOffers.find(
        x =>
          x.id !== currentOfferId &&
          !x.seenAt &&
          !state.seenOffers.includes(x.id)
      );
      if (nextOffer) {
        commit('setNextOfferId', nextOffer.id);
        return;
      }

      if (!state.fetchingNextOffers) {
        dispatch('fetchNextOffers');
      }
    },

    async fetchNextOffers({ commit, dispatch, state }) {
      commit('fetchNextOffersStart');
      try {
        const offers = await fetchNextOffers(
          'my-user-id',
          lookupConfig.nextOffersBatchSize,
          state.nextOffersOffset
        );
        console.log(offers.map(x => x.id));
        commit('fetchNextOffersSuccess', offers);
        if (
          !state.nextOfferId ||
          (state.currentOffer && state.currentOffer.id === state.nextOfferId)
        ) {
          dispatch(
            'setNextOfferId',
            state.currentOffer && state.currentOffer.id
          );
        }
      } catch (err) {
        commit('fetchNextOffersFail', err.message);
      }
    },

    removeOfferFromNext({ commit, dispatch, state }, id) {
      commit('removeOfferFromNext', id);
      if (id === state.nextOfferId) {
        dispatch('getNextOffer', state.currentOffer.id);
      }
      if (
        state.nextOffers.length < lookupConfig.minNextOffers &&
        !state.fetchNextOffers
      ) {
        dispatch('fetchNextOffers');
      }
    }
  }
};
