import Vue from 'vue';
import Router from 'vue-router';
import NotFoundVue from '@/components/notfound/NotFound.vue';
import HomeVue from '@/components/Home';
import LookupVue from '@/components/lookup/Lookup.vue';
import OfferFormVue from '@/components/offers/OfferForm.vue';
import OfferPreviewVue from '@/components/offers/OfferPreview.vue';
import UserOffersVue from '@/components/offers/user-offers/UserOffers.vue';
import CurrentOfferVue from '@/components/lookup/offers/CurrentOffer.vue';
import MyAccountVue from '@/components/user/MyAccount.vue';
import AuthVue from '@/components/auth/Auth.vue';
import LoginVue from '@/components/auth/Login.vue';
import RegistrationVue from '@/components/auth/Registration.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Auth',
      component: AuthVue,
      children: [
        {
          path: '/registration',
          name: 'Registration',
          component: RegistrationVue
        },
        { path: '/login', name: 'Login', component: LoginVue }
      ]
    },
    {
      path: '/lookup',
      name: 'Lookup',
      component: LookupVue,
      children: [
        { name: 'LookupOffer', path: '/lookup/:id', component: CurrentOfferVue }
      ]
    },
    {
      path: '/offers/new',
      name: 'CreateOffer',
      component: OfferFormVue
    },
    {
      path: '/offers/edit/:id',
      name: 'EditOffer',
      component: OfferFormVue,
      props: true
    },
    {
      path: '/offers/preview/:id',
      name: 'OfferPreview',
      component: OfferPreviewVue,
      props: true
    },
    {
      path: '/me/offers',
      name: 'UserOffers',
      component: UserOffersVue
    },
    {
      path: '/me/account',
      name: 'MyAccount',
      component: MyAccountVue
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
      redirect: {
        name: 'NotFound'
      }
    }
  ]
});
