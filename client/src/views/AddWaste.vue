<template>
  <div class="add-waste-container">
    <div class="col1">
      <h1>Add waste</h1>
      <h3>
        You need to set your phone number in settings to post stuff, otherwise
        people won’t be able to contact you.
      </h3>
    </div>
    <div class="col2">
      <text-field label="Image url" v-model="imageUrl" />
      <text-field
        label="Title"
        v-model="title"
        :icon="imageUrl ? 'brain_circuit s20 regular' : null"
        @clickIcon="autofill"
      />
      <multi-line-field label="Description" v-model="description" />
      <div>
        <label for="#category-select">Category</label>
        <select id="category-select" v-model="category">
          <option v-for="cat in availableCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <button @click="addWaste">Submit</button>
    </div>
  </div>
</template>

<script>
import WasteService from '../api/WasteService';
import MLService from '../api/MLService';
import TextField from '../components/TextField.vue';
import MultiLineField from '../components/MultiLineField.vue';
import dialogStore from '../store/dialog';
import { categories } from '../constants';

export default {
  components: { TextField, MultiLineField },
  data() {
    return {
      availableCategories: categories,
      imageUrl: '',
      title: '',
      description: '',
      category: '',
    };
  },
  methods: {
    async addWaste() {
      await WasteService.addWaste(
        this.imageUrl,
        this.title,
        this.description,
        this.category
      );
      this.$router.go(-1);
      dialogStore.type = 'success';
      dialogStore.title = 'Added waste';
      dialogStore.description = 'Success! Your new waste has been posted.';
      dialogStore.shown = true;
    },
    async autofill() {
      var rec = await MLService.autofillTitle(this.imageUrl);
      this.title = this.title + ' ' + rec;
    },
  },
};
</script>

<style lang="scss">
.add-waste-container {
  display: flex;

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

  h3 {
    color: rgba(#000, 0.4);
    margin-bottom: 46px;
  }
}

label {
  font-size: 12px;
  margin-right: 10px;
}

button {
  align-self: flex-start;
  margin-top: 40px;
}
</style>
