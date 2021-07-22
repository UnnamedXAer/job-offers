import Vue from 'vue';
import Vuex from 'vuex';
import { store as lookupStore } from './lookup';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    lookup: lookupStore
  }
});

export default store;
