import Vue from 'vue';
import Router from 'vue-router';
import NotFoundVue from '@/components/notfound/NotFound.vue';
import HomeVue from '@/components/Home';
import LookupVue from '@/components/lookup/Lookup.vue';
import NewOfferVue from '@/components/offers/NewOffer.vue';
import NewOfferPreviewVue from '@/components/offers/NewOfferPreviewVue.vue';
import UserOffersVue from '@/components/offers/user-offers/UserOffers.vue';

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
      path: '/me/offers/new',
      name: 'CreateOffer',
      component: NewOfferVue
    },
    {
      path: '/me/offers/new/preview',
      name: 'NewOfferPreview',
      component: NewOfferPreviewVue,
      props: true
    },
    { path: '/me/offers', name: 'MyOffers', component: UserOffersVue },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFoundVue
    },
    {
      path: '/',
      name: 'Home',
      component: HomeVue
    },
    {
      path: '*',
      redirect: {
        name: 'NotFound'
      }
    }
  ]
});
