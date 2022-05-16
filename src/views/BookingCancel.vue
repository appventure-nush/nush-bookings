<template>
  <div class="booking-cancel">
    <div style="display: flex; align-items: start">
      <img src="@/assets/img/school_logo.png" height="54" width="100" />
    </div>
    <h1>Your booking has been cancelled</h1>
    <div class="cancel-btn" @click="returnMainPage">
      Click here to return to main page
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    function returnMainPage() {
      router.push('../');
    }
    return {
      returnMainPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.booking-cancel {
  height: 100vh;
  background-image: url('~@/assets/img/booking-pass-bg.png');
  background-size: cover;
  padding: 46px 50px 40px 50px;
  color: white;
  display: flex;
  flex-direction: column;
}

.num-ppl {
  font-size: 24px;
  font-weight: 500;
  margin-left: 10px;
}

h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
}

h2 {
  font-size: 22px;
  font-weight: 700;
  opacity: 0.8;
  margin-bottom: 28px;
  margin-right: 20px;
}

.small-text {
  font-size: 16px;
  font-weight: 500;
  opacity: 0.4;
}

.cancel-btn {
  align-self: flex-start;
  background-color: rgba(#000, 0.1);
  padding: 14px 18px 14px 18px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: background-color 200ms;

  &:active {
    background-color: rgba(#000, 0.2);
  }
}

// for dialog transition

.v-enter-active,
.v-leave-active {
  transition: opacity 400ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
