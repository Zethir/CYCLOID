<template>
  <div class="container">
    <el-row class="fixed-height">
      <el-col :span="24">
        <vue-typed-js
          :strings="['Fruits.']"
          :show-cursor="false"
          :type-speed="100"
        >
          <h1 class="typing title" />
        </vue-typed-js>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <fruit-card
        :fruit="fruit"
        :index="index"
        @delete="deleteFruit"
        v-for="(fruit, index) in fruits"
        :key="fruit.id"
      />
      <fruit-form />
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FruitCard from '@/components/FruitCard.vue';
import FruitForm from '@/components/FruitForm.vue';

export default {
  name: 'Fruits',

  data() {
    return {
      show: false,
    };
  },

  components: {
    FruitCard,
    FruitForm,
  },

  computed: {
    ...mapState(['fruits']),
  },

  created() {
    this.fetchFruits();
  },

  methods: {
    ...mapActions(['fetchFruits', 'deleteFruit']),
  },
};
</script>

<style>
.el-card {
  margin-bottom: 20px;
  height: 400px;
}

.container {
  margin: 1vw 10vw;
}

.title {
  font-size: 11vw;
  margin: 0;
  margin-bottom: 1vw;
  color: #070707;
  width: 100%;
}

.el-fade-in-enter-active {
  transition: all 3s ease !important;
}

.el-face-in-leave-active {
  transition: all 1s ease !important;
}

.el-fade-in-linear-enter-active, .el-fade-in-linear-leave-active {
  transition: all 2s ease !important;
}
</style>
