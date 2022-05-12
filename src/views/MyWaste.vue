<template>
  <div class="my-waste-container">
    <span v-if="loading">Loading</span>
    <span v-else-if="wastes.length === 0">You havent posted anything yet</span>
    <div class="wastes-list" v-else>
      <div
        class="waste-list-item"
        v-for="waste in wastes"
        :key="waste._id"
        @click="editWaste(waste._id)"
      >
        <img :src="waste.imageUrl" />
        <div class="text">
          <h3>{{ waste.title }}</h3>
          <span>{{ waste.description }}</span>
        </div>
        <div class="icon-buttons">
          <i
            class="checkmark s24 regular"
            @click.stop="confirmMarkCollected"
          ></i>
          <i class="delete s24 regular" @click.stop="confirmDelete"></i>
        </div>
      </div>
    </div>
    <div class="add-waste-btn" @click="goToAddWaste">
      <div class="circle">
        <i class="add s28 regular"></i>
      </div>
      <h2>Add waste</h2>
    </div>
  </div>
</template>

<script>
import WasteService from '../api/WasteService';
import userStore from '../store/user';

export default {
  name: 'MyWaste',
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
      for (const wasteId of this.user.wastesPosted) {
        const waste = await WasteService.getWaste(wasteId);
        this.wastes.push(waste);
      }
      this.loading = false;
    },
    editWaste(id) {
      this.$router.push('/edit-waste/' + id);
    },
    goToAddWaste() {
      this.$router.push('/add-waste');
    },
    confirmMarkCollected() {},
    confirmDelete() {},
  },
};
</script>

<style lang="scss" scoped>
.my-waste-container {
  padding: 60px 100px 60px 100px;
}

.waste-list-item {
  display: flex;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid rgba(#000, 0.04);
  cursor: pointer;
  padding-left: 40px;
  padding-right: 40px;

  &:hover {
    background-color: rgba(#000, 0.04);
  }

  &:active {
    background-color: rgba(#000, 0.08);
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    object-fit: cover;
    margin-right: 24px;
  }

  .text {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4px;

    span {
      font-size: 14px;
    }
  }

  .icon-buttons {
    display: flex;
    gap: 24px;

    i:active {
      color: rgba(#000, 0.6);
    }
  }
}

.add-waste-btn {
  display: flex;
  align-items: center;
  height: 100px;
  cursor: pointer;
  padding-left: 40px;
  padding-right: 40px;

  &:hover {
    background-color: rgba(#000, 0.04);
  }

  &:active {
    background-color: rgba(#000, 0.08);
  }

  .circle {
    width: 60px;
    height: 60px;
    background-color: black;
    border-radius: 30px;
    color: white;
    display: grid;
    place-items: center;
    margin-right: 30px;
  }
}
</style>
