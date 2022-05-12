<template>
  <div class="app-sidebar-container">
    <app-icon />
    <router-link
      class="link-container"
      :class="{ selected: link.route === linkPath }"
      v-for="link in links"
      :key="link.text"
      :to="link.route"
    >
      <i
        :class="
          link.icon + ' ' + (link.route === linkPath ? 'filled' : 'regular')
        "
      ></i>
      <span>{{ link.text }}</span>
    </router-link>
    <!-- <div class="spacer"></div> -->
  </div>
</template>

<script>
import AppIcon from './AppIcon.vue';

const links = [
  {
    icon: 'home s20',
    text: 'Home',
    route: 'home',
  },
  {
    icon: 'apps_list s20',
    text: 'My waste',
    route: 'my-waste',
  },
  {
    icon: 'heart s20',
    text: 'Favorites',
    route: 'favorites',
  },
  {
    icon: 'settings s20',
    text: 'Settings',
    route: 'settings',
  },
];

export default {
  components: { AppIcon },
  data() {
    return { links };
  },
  computed: {
    linkPath() {
      return this.$route.path.split('/')[2];
    },
  },
};
</script>

<style lang="scss" scoped>
.app-sidebar-container {
  width: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 36px 34px 36px 34px;
  border-right: 1px solid #e9e9e9;

  .app-icon-container {
    margin-bottom: 36px;
  }

  .link-container {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 6px;
    border-radius: 8px;
    padding: 10px 14px 10px 14px;
    cursor: pointer;
    color: black;

    &:hover {
      background-color: #f8f8f8;
    }

    &.selected {
      background-color: #f8f8f8;
      cursor: auto;

      span {
        font-weight: 700;
      }
    }
  }
}
</style>
