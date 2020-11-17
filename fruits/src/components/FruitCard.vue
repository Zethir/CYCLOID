<template>
  <transition
    name="el-fade-in"
    appear
  >
    <el-col
      :xs="24"
      :sm="12"
      :md="12"
      :lg="8"
      :key="fruit.id"
    >
      <el-card :body-style="{ padding: '0px' }">
        <div class="img_wrap">
          <img
            :src="fruit.image"
            class="image"
          >
          <div class="text_background">
            <p class="img_desc">
              {{ fruit.name | capitalize }}
            </p>
            <div class="button_wrap">
              <router-link
                class="padding_link"
                :to="{ name: 'Fruit', params: {id: fruit.id } }"
              >
                <el-button
                  class="search_button"
                  icon="el-icon-search"
                  title="Fruit Details"
                  circle
                />
              </router-link>
              <el-button
                @click="deleteFruit({
                  'fruitId': fruit.id,
                  'index': index
                })"
                title="Delete fruit"
                type="danger"
                icon="el-icon-delete"
                circle
              />
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </transition>
</template>

<script>
import { capitalize } from 'vuetensils/src/filters';

export default {
  name: 'FruitCard',

  props: {
    fruit: {
      default: () => {},
      type: Object,
    },
    index: {
      default: 0,
      type: Number,
    },
  },

  filters: {
    capitalize,
  },

  methods: {
    deleteFruit(deletionIds) {
      this.$confirm('Are you sure you want to delete this magnific fruit?', 'Warning', {
        confirmButtonText: 'Oh yeah',
        cancelButtonText: 'No, my bad',
        type: 'warning',
      }).then(() => {
        this.$emit('delete', deletionIds);
        this.$message({
          type: 'success',
          message: 'Extermination completed',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'You dodged a bullet there buddy',
        });
      });
    },
  },
};
</script>

<style>
.img_wrap {
  position: relative;
  width: 100%;
}

.img_wrap .image {
  display: block;
  width: 100%;
  object-fit: cover;
  height: 400px;
}

.img_wrap .img_desc {
  color: #fff;
  font-size: 30px;
  line-height: 1.0em;
  text-align: center;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  visibility: hidden;
  cursor: default;
}

.img_wrap:hover .img_desc {
  opacity: 1;
  visibility: visible;
}

.img_wrap .text_background {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: rgba(0,0,0,0.5);
}

.img_wrap:hover .text_background {
  opacity: 1;
}

.button_wrap {
  top: 49%;
  text-align: center;
  position: absolute;
  width: 100%;
}

.padding_link {
  padding-right: 10px;
}

.search_button:hover {
  color: #b5b4b4 !important;
  border-color: bfbfbf !important;
  background-color: #fff !important;
}
</style>
