import Vue from 'vue';
import Router from 'vue-router';
import NotFoundVue from '@/components/notfound/NotFound.vue';
import HomeVue from '@/components/Home';
import LookupVue from '@/components/lookup/Lookup.vue';
import NewOfferVue from '@/components/offers/NewOffer.vue';
import EditOfferVue from '@/components/offers/EditOffer.vue';
import OfferPreviewVue from '@/components/offers/OfferPreview.vue';
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
      path: '/offers/edit/:id',
      name: 'EditOffer',
      component: EditOfferVue
    },
    {
      path: '/offers/preview/:id',
      name: 'OfferPreview',
      component: OfferPreviewVue,
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
