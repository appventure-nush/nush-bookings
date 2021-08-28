<template>
  <div class="favorites-container">
    <span v-if="loading">Loading</span>
    <span v-else-if="wastes.length === 0">You dont have any favorites yet</span>
    <div class="wastes-list" v-else>
      <waste-card
        v-for="waste in wastes"
        :key="waste._id"
        :imageUrl="waste.imageUrl"
        :title="waste.title"
        :description="waste.description"
        :isFav="true"
        @favorite="removeFav(waste._id)"
        @click="goToWaste(waste._id)"
      />
    </div>
  </div>
</template>

<script>
import WasteCard from '../components/WasteCard';
import WasteService from '../api/WasteService';
import userStore from '../store/user';

export default {
  name: 'Favorites',
  components: { WasteCard },
  data() {
    return {
      loading: true,
      wastes: [],
      ...userStore,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      for (const wasteId of this.user.favorites) {
        // console.log(wasteId)
        const waste = await WasteService.getWaste(wasteId);
        this.wastes.push(waste);
        // console.log(waste);
      }
      this.loading = false;
    },
    async removeFav(id) {
      await WasteService.toggleFav(id);
      this.wastes = this.wastes.filter((waste) => waste._id !== id);
    },
    goToWaste(id) {
      this.$router.push('/waste/' + id);
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-container {
  padding: 50px 80px 50px 80px;
}

.wastes-list {
  display: grid;
  grid-template-columns: repeat(4, 260px);
}
</style>
