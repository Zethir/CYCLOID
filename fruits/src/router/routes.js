import Fruits from '../views/Fruits.vue';
import Fruit from '../views/Fruit.vue';

export default [
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
