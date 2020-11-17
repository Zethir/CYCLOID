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
    >
      <el-card>
        <div class="icon_wrapper">
          <div class="button_wrapper">
            <el-button
              icon="el-icon-plus"
              @click="dialogFormVisible = true"
              type="text"
              class="add_icon"
              circle
            />
            <h1 class="label_add">
              Add a fruit !
            </h1>
          </div>
        </div>
        <el-dialog
          title="Fruit Addition"
          :visible.sync="dialogFormVisible"
        >
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            size="small"
          >
            <el-form-item
              label="Fruit name"
              prop="name"
            >
              <el-input
                placeholder="Kiwi"
                v-model="ruleForm.name"
              />
            </el-form-item>
            <el-form-item
              label="Image"
              prop="image"
            >
              <el-input
                placeholder="mybeautifulorange.fr"
                v-model="ruleForm.image"
                prop="image"
              >
                <template slot="prepend">
                  https://
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="Price"
              prop="price"
            >
              <el-input
                placeholder="4.20"
                v-model.number="ruleForm.price"
              />
            </el-form-item>
            <el-form-item
              label="Description"
              prop="desc"
            >
              <el-input
                placeholder="This majestuous fruit comes from a very distant land"
                type="textarea"
                v-model="ruleForm.desc"
              />
            </el-form-item>
            <el-form-item
              label="Taste"
              prop="taste"
            >
              <el-input
                placeholder="Deliciously delicious"
                v-model="ruleForm.taste"
              />
            </el-form-item>
            <el-form-item
              label="Expiration Date"
              prop="expires"
            >
              <el-date-picker
                style="width: 100%;"
                type="date"
                placeholder="Can I still eat it?"
                v-model="ruleForm.expires"
              />
            </el-form-item>
            <el-form-item
              label="Color"
              prop="color"
              class="color_picker"
            >
              <el-color-picker
                v-model="ruleForm.color"
                size="medium"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                class="submit_button"
                @click="submitForm('ruleForm')"
              >
                Add Fruit
              </el-button>
              <el-button
                class="reset_button"
                @click="resetForm('ruleForm')"
              >
                Reset
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-card>
    </el-col>
  </transition>
</template>

<script>
import { mapActions } from 'vuex';
import { uuid } from 'vue-uuid';

export default {
  name: 'FruitForm',

  data() {
    const checkPrice = (rule, value, callback) => {
      if (!value) {
        callback(new Error('We need to put a price on this'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('Digits not letters'));
      }
      callback();
    };
    return {
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        image: '',
        price: '',
        desc: '',
        taste: '',
        expires: '',
        color: '',
        id: '',
        isFruit: true,
      },
      rules: {
        name: [
          { required: true, message: 'That fruit gotta have a name', trigger: 'blur' },
        ],
        image: [
          { required: true, message: 'Come on I need to see it', trigger: 'blur' },
        ],
        price: [
          { validator: checkPrice, required: true, trigger: 'blur' },
        ],
        desc: [
          { required: true, message: 'A little backstory would be nice', trigger: 'blur' },
        ],
        taste: [
          { required: true, message: 'How does it taste?', trigger: 'blur' },
        ],
        expires: [{
          type: 'date',
          required: true,
          message: 'I need to know if I\'m going to die',
          trigger: 'blur',
        },
        ],
        color: [
          { required: true, message: 'Give me that hexa', trigger: 'change' },
        ],
      },
    };
  },

  methods: {
    ...mapActions(['addFruit']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.ruleForm.id = uuid.v1();
          this.ruleForm.image = 'https://'.concat(this.ruleForm.image);
          const newDate = new Date(this.ruleForm.expires);
          this.ruleForm.expires = newDate.toISOString();
          this.addFruit(this.ruleForm);
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>

.el-card__body {
  height: 90%;
}

.icon_wrapper {
  position: relative;
  width: 100%;
}

.icon_wrapper .button_wrapper {
  position: absolute;
  transform: translate(-50%, 38%);
  width: 100%;
  left: 50%;
}

.add_icon {
  color: #070707 !important;
  font-size: 100px !important;
}

.add_icon:hover {
  color: #2d2d2d !important;
}

.label_add {
  margin-top: 0;
}

.el-dialog {
  margin-top: 3vw !important;
  margin-bottom: 3vw !important;
}

.el-dialog__body {
  padding: 10px 20px !important;
}

.color_picker {
  text-align: left !important;
}

.submit_button {
  color: #fff !important;
  background-color: #535353 !important;
  border-color: #464646 !important;
}

.submit_button:hover {
  background-color: #606060 !important;
  border-color: #535353 !important;
}

.reset_button:hover {
  border-color: #DCDFE6 !important;
  background-color: #f8f8f8 !important;
  color: #606266 !important;
}
</style>
