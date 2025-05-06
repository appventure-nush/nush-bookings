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
          font-size: var(--normal-text-size);
          font-weight: 500;
          margin-top: 60px;
        "
      >
        Tour ID: {{ selectedTiming + '_' + groupId }}
      </span>
    </h2>
    <span class="small-text">
      Screenshot this page and show it to your tour guide. Please report to
      <u>{{ startLocation }}</u> 5 minutes early so the tour can start on time.
      Look out for the <u>{{ routeColor }}</u> column there!
    </span>
    <div class="spacer"></div>
    <div class="cancel-btn" @click="showDialog = true">Cancel booking</div>
  </div>
</template>

<script>
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
      groupId: 'A1',
    };
  },
  computed: {
    timingFormatted() {
      return formatTiming(this.selectedTiming);
    },
    // location() {
    //   return getTourLocation(this.groupId);
    // },
    routeColor() {
      switch (this.groupId[0]) {
        case 'A':
          return 'red';
        case 'B':
          return 'yellow';
        case 'C':
          return 'blue';
        case 'D':
          return 'green';
        default:
          throw 'Invalid route';
      }
    },
    startLocation() {
      switch (this.groupId[0]) {
        case 'A':
          return 'the CLOUD (L1, near back gate)';
        case 'B':
          return 'the CLOUD (L1, near back gate)';
        case 'C':
          return 'the front of the canteen (L1, near cafe)';
        default:
          throw '<INVALID VALUE>';
      }
    },
  },
  created() {
    this.loadBookingInfo();
  },
  methods: {
    async loadBookingInfo() {
      this.numPpl = localStorage.getItem('numPpl');
      const [timing, group] = localStorage.getItem('tourId').split('_');
      this.selectedTiming = timing;
      this.groupId = group;
    },
    async cancelBooking() {
      await DbService.cancelBooking(
        localStorage.getItem('tourId'),
        localStorage.getItem('bookingId')
      );
      localStorage.removeItem('selectedTiming');
      localStorage.removeItem('numPpl');
      localStorage.removeItem('bookingId');
      localStorage.removeItem('tourId');
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
  font-size: var(--bigger-text-size);
  font-weight: 700;
  opacity: 0.8;
  margin-bottom: 14px;
}

.small-text {
  font-size: var(--smaller-text-size);
  font-weight: 500;
  opacity: 0.4;
}

.cancel-btn {
  align-self: flex-start;
  background-color: rgba(#000, 0.1);
  padding: 14px 18px 13px 18px;
  font-size: var(--normal-text-size);
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: background-color 200ms ease-in-out;

  &:active {
    background-color: rgba(#000, 0.2);
  }
}
</style>
