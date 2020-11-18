import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import parseDataSet from '@/helpers/parser';

Vue.use(Vuex);

export const mutations = {
  SAVE_FRUITS(state, fruits) {
    state.fruits = fruits;
  },
  DELETE_FRUIT(state, fruitId) {
    state.fruits.splice(fruitId, 1);
  },
  ADD_FRUIT(state, fruitData) {
    state.fruits.push(fruitData);
  },
  SET_FRUIT(state, fruit) {
    state.fruit = fruit;
  },
};

export const actions = {
  async fetchFruits({ commit }) {
    await axios
      .get('http://localhost:3000/fruit')
      .then(async (result) => {
        commit('SAVE_FRUITS', await parseDataSet(result.data));
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
  async deleteFruit({ commit }, { fruitId, index }) {
    await axios
      .delete(`http://localhost:3000/fruit/${fruitId}`)
      .then(() => {
        commit('DELETE_FRUIT', index);
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
  async addFruit({ commit }, fruitData) {
    await axios
      .post('http://localhost:3000/fruit', fruitData)
      .then(() => {
        commit('ADD_FRUIT', fruitData);
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
  async fetchFruit({ commit }, fruitId) {
    await axios
      .get(`http://localhost:3000/fruit/${fruitId}`)
      .then((res) => {
        commit('SET_FRUIT', res.data);
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
};

export const state = {
  fruits: [],
  fruit: {},
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
