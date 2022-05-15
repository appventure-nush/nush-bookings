<template>
  <Transition>
    <Dialog
      v-if="showDialog"
      v-show="bookingDone"
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
      <i v-show="bookingDone" class="person s24 regular"></i>
      <span v-show="bookingDone" class="num-ppl">{{ numPpl }}</span>
    </div>
    <div class="spacer"></div>
    <h1 v-show="bookingDone">You're all set!</h1>
    <h1 v-show="!bookingDone">An error has occurred...</h1>
    <h2 v-show="!bookingDone">
      Oops... Seems like you have yet to register. Return to the main page to
      register!
    </h2>
    <div v-show="!bookingDone" class="cancel-btn" @click="returnMainPage">
      Return to Main Page
    </div>
    <h2 v-show="bookingDone">
      Your NUS High tour is booked for {{ tourTiming }}
    </h2>
    <h2 v-show="bookingDone">Phone Number: {{ phoneNumber }}</h2>
    <h2 v-show="bookingDone">Tour ID: {{ tourID }}</h2>
    <span v-show="bookingDone" class="small-text">
      Show this screen to your tour guide
    </span>
    <div class="spacer"></div>
    <div v-show="bookingDone" class="cancel-btn" @click="showDialog = true">
      Cancel booking
    </div>
  </div>
</template>

<script>
import Dialog from '../components/Dialog.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DbService from '../api/DbService';

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      showDialog: false,
      tourTiming: '2:00pm',
      bookingDone: true,
      tourID: '',
    };
  },
  setup() {
    const router = useRouter();
    const phoneNumber = ref(localStorage.getItem('phoneNumber'));
    const numPpl = ref(localStorage.getItem('numPpl'));
    function returnMainPage() {
      router.push('../');
    }
    return {
      phoneNumber,
      numPpl,
      returnMainPage,
    };
  },
  async created() {
    this.tourID = await DbService.getTourbyParticipant(
      parseInt(this.phoneNumber),
      parseInt(this.numPpl)
    );
    console.log(this.tourID);
    if (this.phoneNumber == null || this.numPpl == null) {
      this.bookingDone = false;
    }
  },
  methods: {
    cancelBooking() {
      // TODO: if i can manage to get tour ID
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
