import Vue from 'vue';
import VueRouter from 'vue-router';
import Fruits from '../views/Fruits.vue';
import Fruit from '../views/Fruit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Fruits',
    component: Fruits,
  },
  {
    path: '/fruit/:id',
    name: 'Fruit',
    component: Fruit,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
