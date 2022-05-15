<template>
  <div class="verification">
    <Loading />
    <span>Processing</span>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';

export default {
  components: { Loading },
  setup() {
    const router = useRouter();

    const FIELDS = ['selectedTiming', 'selectedRoute', 'numPpl', 'phoneNumber'];
    const PAGES = [
      'select-timing',
      'select-route',
      'num-people',
      'phone-number',
    ];
    for (const i in FIELDS) {
      const value = localStorage.getItem(FIELDS[i]);
      if (value == null) {
        router.push('/' + PAGES[i]);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.verification {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1c1c1c;

  span {
    margin-top: 30px;
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
