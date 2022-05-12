<template>
  <div v-if="bearer" class="waste-container">
    <img :src="waste.imageUrl" />
    <div class="right">
      <h1>{{ waste.title }}</h1>
      <h2>By {{ bearer.username }}</h2>
      <p>{{ waste.description }}</p>
      <div class="buttons">
        <button @click="toggleFavorite">
          <i
            :class="isFav ? 'heart s20 filled' : 'heart s20 regular'"
            :style="{ color: isFav ? '#D72786' : 'black' }"
          ></i>
          Favorite
        </button>
        <button @click="showContact">
          <i class="call s20 regular"></i>Contact
        </button>
      </div>
    </div>
  </div>
  <div v-else>Loading</div>
</template>

<script>
import AuthService from '../api/AuthService';
import WasteService from '../api/WasteService';
import userStore from '../store/user';
import dialogStore from '../store/dialog';

export default {
  props: {
    id: String,
  },
  data() {
    return {
      waste: null,
      bearer: null,
    };
  },
  computed: {
    isFav() {
      return userStore.user.favorites.includes(this.id);
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.waste = await WasteService.getWaste(this.id);
      this.bearer = await AuthService.getBearerInfo(this.waste.postedBy);
    },
    async toggleFavorite() {
      await WasteService.toggleFav(this.id);
      if (userStore.user.favorites.includes(this.id)) {
        const index = userStore.user.favorites.indexOf(this.id);
        userStore.user.favorites.splice(index, 1);
      } else {
        userStore.user.favorites.push(this.id);
      }
    },
    async showContact() {
      dialogStore.type = 'info';
      dialogStore.title = 'Phone number';
      dialogStore.description =
        "Here's the waste-bearer's phone number: " + this.bearer.phoneNumber;
      dialogStore.shown = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.waste-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 140px;
}

img {
  width: 300px;
  border-radius: 20px;
  margin-right: 80px;
}

.right {
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 10px;
  }

  h2 {
    color: rgba(#000, 0.4);
    margin-bottom: 34px;
  }

  p {
    margin-bottom: 50px;
  }
}

.buttons {
  display: flex;
  gap: 14px;

  button {
    height: 36px;
    display: flex;
    align-items: center;
    background-color: rgba(#000, 0.04);
    color: black;
    padding-left: 18px;
    padding-right: 18px;

    i {
      margin-right: 12px;
    }

    &:active {
      background-color: rgba(#000, 0.08);
    }
  }
}
</style>
