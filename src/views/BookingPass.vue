<template>
  <Transition>
    <Dialog
      v-if="showDialog"
      title="Cancel booking?"
      message="Are you sure you want to cancel your booking? Your slot will be freed up for others."
      isYesNo
      @yes="cancelBooking"
      @no="showDialog = false"
    />
  </Transition>
  <div class="booking-pass" :class="routeColor">
    <div style="display: flex; align-items: center">
      <img src="@/assets/img/school_logo.png" height="54" width="100" />
      <div class="spacer"></div>
      <i class="person s24 regular"></i>
      <span class="num-ppl">{{ numPpl }}</span>
    </div>
    <div class="spacer"></div>
    <h1>You're all set!</h1>
    <h2>
      Your NUS High tour is booked for {{ timingFormatted }}.
      <span
        style="
          display: block;
          font-size: 16px;
          font-weight: 500;
          margin-top: 60px;
        "
      >
        Venue: {{ location }}
        <br />
        Tour ID: {{ selectedRoute + '_' + selectedTiming }}
      </span>
    </h2>
    <span class="small-text"> Show this page to your tour guide </span>
    <div class="spacer"></div>
    <div class="cancel-btn" @click="showDialog = true">Cancel booking</div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import Dialog from '../components/Dialog.vue';
import DbService from '../api/DbService';
import { formatTiming } from '../utils/formatTiming';
import { getTourLocation } from '../utils/tourLocation';

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      showDialog: false,
      numPpl: 0,
      selectedTiming: 200,
      selectedRoute: 'A1',
    };
  },
  computed: {
    timingFormatted() {
      return formatTiming(this.selectedTiming);
    },
    location() {
      return getTourLocation(this.selectedRoute);
    },
    routeColor() {
      switch (this.selectedRoute[0]) {
        case 'A':
          return 'red';
        case 'B':
          return 'blue';
        case 'C':
          return 'green';
        case 'D':
          return 'yellow';
        default:
          throw 'Invalid route';
      }
    },
  },
  created() {
    this.loadBookingInfo();
  },
  methods: {
    async loadBookingInfo() {
      let { phoneNumber } = getAuth().currentUser;
      this.numPpl = parseInt(localStorage.getItem('numPpl')); // not ideal but should work most of the time :/
      const bookingInfo = await DbService.getTourbyParticipant(
        phoneNumber,
        this.numPpl
      );
      if (bookingInfo == null) {
        // authenticated but no booking for some reason
        await getAuth().signOut();
        return;
      }
      this.selectedTiming = bookingInfo.time.integerValue;
      this.selectedRoute = bookingInfo.route.stringValue;
    },
    async cancelBooking() {
      const tourId = this.selectedTiming + '_' + this.selectedRoute;
      await DbService.deleteParticipant(
        tourId,
        getAuth().currentUser.phoneNumber,
        this.numPpl
      );
      await getAuth().signOut();
      this.showDialog = false;
      this.$router.push('/');
      alert('Successfully cancelled booking');
    },
  },
};
</script>

<style lang="scss" scoped>
.booking-pass {
  height: 100%;
  background-size: cover;
  padding: 42px 46px 40px 46px;
  color: white;
  display: flex;
  flex-direction: column;

  &.red {
    background-image: url('~@/assets/img/pass-bg-red.png');
  }

  &.blue {
    background-image: url('~@/assets/img/pass-bg-blue.png');
  }

  &.green {
    background-image: url('~@/assets/img/pass-bg-green.png');
  }

  &.yellow {
    background-image: url('~@/assets/img/pass-bg-yellow.png');
  }
}

.num-ppl {
  font-size: 20px;
  font-weight: 500;
  margin-left: 10px;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 14px;
}

h2 {
  font-size: 20px;
  font-weight: 700;
  opacity: 0.8;
  margin-bottom: 14px;
}

.small-text {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.4;
}

.cancel-btn {
  align-self: flex-start;
  background-color: rgba(#000, 0.1);
  padding: 14px 18px 13px 18px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: background-color 200ms;

  &:active {
    background-color: rgba(#000, 0.2);
  }
}
</style>
