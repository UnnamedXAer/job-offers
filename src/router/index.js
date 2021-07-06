import Vue from 'vue';
import Router from 'vue-router';
import HomeVue from '@/components/Home';
import LookupVue from '@/components/lookup/Lookup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/lookup',
      name: 'Lookup',
      component: LookupVue
    },
    {
      path: '/',
      name: 'Home',
      component: HomeVue
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
