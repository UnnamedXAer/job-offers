// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Vue from 'vue';
import App from './App';
import router from './router';

// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

window.addEventListener('message', e => {
  if (
    e.data &&
    typeof e.data === 'string' &&
    e.data.match(/webpackHotUpdate/)
  ) {
    console.log('hot reload happened');
    // console.clear();
  }
});
