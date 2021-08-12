import Vue from 'vue';
import Vuex from 'vuex';
import { authStore } from './auth/auth';
import { userStore } from './auth/user';
import { lookupStore } from './lookup/lookup';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    lookup: lookupStore,
    auth: authStore,
    user: userStore
  }
});

export default store;
