<template>
  <Transition>
    <Dialog
      v-if="showDialog"
      title="Cancel booking?"
      message="Are you sure you want to cancel your booking? Your slot will be freed up for others."
      @yes="cancelBooking"
      @no="showDialog = false"
    />
  </Transition>
  <div class="booking-pass">
    <div style="display: flex; align-items: start">
      <img src="@/assets/img/school_logo.png" height="54" width="100" />
      <div class="spacer"></div>
      <i class="person s24 regular"></i>
      <span class="num-ppl">{{ numPpl }}</span>
    </div>
    <div class="spacer"></div>
    <h1>You're all set!</h1>
    <h2>Your NUS High tour starts at the Theatrette at 2pm</h2>
    <span class="small-text">Show this screen to your tour guide</span>
    <div class="spacer"></div>
    <div class="cancel-btn" @click="showDialog = true">Cancel booking</div>
  </div>
</template>

<script>
import Dialog from '../components/Dialog.vue';


export default {
  components: { Dialog },
  data() {
    return {
      showDialog: true,
      numPpl: 2,
    };
  },
  methods: {
    cancelBooking() {
      // TODO
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.booking-pass {
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
