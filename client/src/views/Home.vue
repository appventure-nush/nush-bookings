<template>
  <div class="home-container">
    <div class="top">
      <text-field
        placeholder="Search"
        v-model="query"
        @change="updateSearchResults"
      />
      <div class="icon-button" @click="showingFilters = !showingFilters">
        <i class="filter s24 regular"></i>
      </div>
      <div class="filters-options" v-if="showingFilters">
        <label for="#category">Category</label>
        <select id="category" name="category" @change="updateCategory">
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <label for="#sortBy">Sort by</label>
        <select id="sortBy" name="sortBy" @change="updateSort">
          <option v-for="s in sortBy" :key="s" :value="s">
            {{ s }}
          </option>
        </select>
      </div>
    </div>
    <div class="cards-list-container">
      <waste-card
        v-for="card in cards"
        :key="card._id"
        :imageUrl="card.imageUrl"
        :title="card.title"
        :description="card.description"
        :isFav="user.favorites.includes(card._id)"
        @favorite="favoriteWaste(card._id)"
        @click="goToWaste(card._id)"
      />
    </div>
  </div>
</template>

<script>
import TextField from '../components/TextField.vue';
import WasteCard from '../components/WasteCard.vue';
import WasteService from '../api/WasteService';
import { categories } from '../constants';
import userStore from '../store/user';

export default {
  components: { TextField, WasteCard },
  name: 'Home',
  data() {
    return {
      showingFilters: false,
      categories,
      sortBy: ['Recent ascending', 'Recent descending'],
      query: '',
      loading: false,
      cards: [
        {
          _id: 'hasonethu',
          imageUrl:
            'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          title: 'Test card',
          description: 'By Jan',
        },
      ],
      ...userStore,
    };
  },
  methods: {
    async loadData() {
      this.loading = true;
      const wastes = await WasteService.recent(true);
      this.cards = wastes;
      this.loading = false;
    },
    async updateSearchResults(e) {
      this.loading = true;
      console.log(e.target.value);
      this.cards = await WasteService.search(e.target.value);
      console.log(this.cards);
      this.loading = false;
    },
    async updateCategory(e) {
      this.loading = true;
      console.log(e.target.value);
      this.cards = await WasteService.category(e.target.value);
      console.log(this.cards);
      this.loading = false;
    },
    async updateSort(e) {
      this.loading = true;
      console.log(e.target.value);
      const ascending = e.target.value == 'Recent ascending';
      this.cards = await WasteService.recent(ascending);
      console.log(this.cards);
      this.loading = false;
    },
    goToWaste(wasteId) {
      this.$router.push('/waste/' + wasteId);
    },
    async favoriteWaste(wasteId) {
      await WasteService.toggleFav(wasteId);
      if (this.user.favorites.includes(wasteId)) {
        const index = this.user.favorites.indexOf(wasteId);
        this.user.favorites.splice(index, 1);
      } else {
        this.user.favorites.push(wasteId);
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss">
.home-container {
  padding: 50px 80px 50px 80px;
}

.top {
  display: flex;
  margin-bottom: 60px;

  .text-field-container {
    flex-grow: 1;
    margin-right: 30px;
  }

  .icon-button {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background-color: #f8f8f8;
    border-radius: 8px;
  }
}

.cards-list-container {
  display: grid;
  grid-template-columns: repeat(4, 260px);
  row-gap: 40px;
}
</style>
