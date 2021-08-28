<template>
  <div v-if="waste" class="edit-waste-container">
    <div class="col1">
      <h1>Edit waste</h1>
      <h3>
        You need to set your phone number in settings to post stuff, otherwise
        people won’t be able to contact you.
      </h3>
    </div>
    <div class="col2">
      <text-field label="Image url" v-model="waste.imageUrl" />
      <text-field label="Title" v-model="waste.title" />
      <multi-line-field label="Description" v-model="waste.description" />
      <div>
        <label for="#category-select">Category</label>
        <select id="category-select" v-model="waste.category">
          <option v-for="cat in availableCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <div class="buttons-container">
        <button @click="waste.collected = !waste.collected">
          Mark as {{ waste.collected ? 'not collected' : 'collected' }}
        </button>
        <button @click="updateWaste">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import WasteService from '../api/WasteService';
import TextField from '../components/TextField.vue';
import MultiLineField from '../components/MultiLineField.vue';
import { categories } from '../constants';

export default {
  components: { TextField, MultiLineField },
  props: {
    id: String,
  },
  data() {
    return {
      availableCategories: categories,
      waste: null,
    };
  },
  mounted() {
    this.loadWasteData();
  },
  methods: {
    async loadWasteData() {
      const waste = await WasteService.getWaste(this.id);
      this.waste = waste;
    },
    async updateWaste() {
      await WasteService.updateWaste(this.waste);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.edit-waste-container {
  padding: 40px;
  display: flex;

  h3 {
    color: rgba(#000, 0.4);
    margin-bottom: 46px;
  }

  .col1,
  .col2 {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding-left: 100px;
    padding-top: 100px;
    padding-bottom: 100px;
    gap: 24px;
  }
}

label {
  font-size: 12px;
  margin-right: 10px;
}

.buttons-container {
  display: flex;
  align-self: flex-start;
  gap: 20px;
}
</style>
