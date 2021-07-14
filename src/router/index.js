import Vue from 'vue';
import Router from 'vue-router';
import NotFoundVue from '@/components/NotFound/NotFound.vue';
import HomeVue from '@/components/Home';
import LookupVue from '@/components/lookup/Lookup.vue';
import NewOfferVue from '@/components/offers/NewOffer.vue';
import NewOfferPreviewVue from '@/components/offers/NewOfferPreviewVue.vue';

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
      path: '/offers/new',
      name: 'CreateOffer',
      component: NewOfferVue
    },
    {
      path: '/offers/new/preview',
      name: 'NewOfferPreview',
      component: NewOfferPreviewVue,
      props: true,
      beforeEnter(to, from, next) {
        if (!to.params || !to.params.offer) {
          return next({
            name: 'NotFound',
            query: {
              reason: 'Missing offer'
            }
          });
        }
        next();
      }
    },
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
      redirect: '/'
    }
  ]
});
