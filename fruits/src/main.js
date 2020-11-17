import Vue from 'vue';
import ElementUI from 'element-ui';
import VueTypedJs from 'vue-typed-js';
import locale from 'element-ui/lib/locale/lang/en';
import UUID from 'vue-uuid';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(VueTypedJs);
Vue.use(UUID);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
