<template>
  <div class="processing">
    <Loading />
    <span>Processing</span>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  components: { Loading },
  setup() {
    localStorage.getItem();
  },
};
</script>

<style lang="scss" scoped>
.processing {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1c1c1c;
}
</style>
