<template>
  <div class="app-container">
    <sidebar />
    <router-view class="router-view" />
  </div>
</template>

<script>
import Sidebar from '../components/AppSidebar';
// import userStore from '../store/user';

export default {
  components: { Sidebar },
  // created() {
  //   console.log('NTAHOESUN');
  //   console.log(userStore.user);
  //   console.log(userStore.user?.data);
  //   if (!userStore.user) {
  //     this.$router.push('/');
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
  display: flex;
}

.router-view {
  flex-grow: 1;
}
</style>
