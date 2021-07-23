import Vue from 'vue';
import Vuex from 'vuex';
import { lookupStore } from './lookup/lookup';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    lookup: lookupStore
  }
});

export default store;
