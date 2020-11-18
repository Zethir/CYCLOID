<template>
  <div class="container">
    <router-link to="/">
      <el-button
        icon="el-icon-back"
        class="go-back-button search_button"
        circle
      />
    </router-link>
    <el-row class="fixed-height">
      <el-col :span="24">
        <vue-typed-js
          :key="componentKey"
          :strings="[title]"
          :show-cursor="false"
          :type-speed="100"
        >
          <h1 class="typing title" />
        </vue-typed-js>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <transition
          name="el-fade-in"
          appear
        >
          <el-card :body-style="{ padding: '0px' }">
            <div class="img_wrap">
              <img
                :src="fruit.image"
                class="image"
              >
            </div>
          </el-card>
        </transition>
      </el-col>
      <el-col
        class="col-format"
        :span="16"
      >
        <transition
          name="el-fade-in-linear"
          appear
        >
          <div class="fruit-desc">
            <p><strong>Price:</strong> {{ fruit.price }}</p>
            <p>
              <strong>Color:</strong> {{ fruit.color }}
              <el-button
                id="circle"
                class="hexa-circle"
                circle
              />
            </p>
            <p><strong>Description:</strong> {{ fruit.description }}</p>
            <p><strong>Taste:</strong> {{ fruit.taste }}</p>
            <p><strong>Expires:</strong> {{ fruit.expires }}</p>
          </div>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import capitalize from '@/filters/capitalize';

export default {
  name: 'Fruit',

  data() {
    return {
      title: '',
      componentKey: 0,
    };
  },

  computed: {
    ...mapState(['fruit']),
  },

  methods: {
    ...mapActions(['fetchFruit']),
  },

  created() {
    this.fetchFruit(this.$route.params.id);
  },

  watch: {
    fruit() {
      document.getElementById('circle').style.setProperty('--background-color', this.fruit.color);
      this.title = capitalize(this.fruit.name);
      this.title += '.';
      this.componentKey += 1;
    },
  },
};
</script>

<style>
.go-back-button {
  position: absolute;
  z-index: 1;
  left: 11%;
}

.fruit-desc {
  margin-left: 2vw;
  text-align: left;
}

.col-format {
  vertical-align: center !important;
  height: 400px;
  display: flex;
  align-items: center;
}

.hexa-circle {
  cursor: default !important;
  border: none !important;
  vertical-align: top !important;
  margin-left: 0.7vw !important;
  background-color: var(--background-color) !important;
}

.hexa-circle:hover {
  background-color: var(--background-color) !important;
}
</style>
