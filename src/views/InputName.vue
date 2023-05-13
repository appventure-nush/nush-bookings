<template>
  <div v-if="!isProcessing" class="page">
    <h1>Your name</h1>
    <p>
      Please enter your name. This will help tour guides identify you later.
    </p>
    <TextField
      v-model="name"
      :error="invalidName ? 'Enter a valid name' : null"
    />
    <div id="recaptcha-container"></div>
    <div class="spacer"></div>
    <Steps
      :numSteps="3"
      :currentStep="3"
      :canContinue="completedCaptcha"
      @continue="submit"
    />
  </div>
  <div v-else class="processing page">
    <Loading />
    <span>Processing</span>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import TextField from '../components/TextField.vue';
import Steps from '@/components/Steps.vue';
import Loading from '@/components/Loading.vue';
import DbService from '../api/DbService';

const auth = getAuth();

export default {
  components: { TextField, Steps, Loading },
  data() {
    return {
      booking: {},
      name: '',
      completedCaptcha: false,
      invalidName: false,
      isProcessing: false,
      // verifier: null,
    };
  },
  created() {
    const router = useRouter();

    this.booking.selectedTiming = localStorage.getItem('selectedTiming');
    this.booking.numPpl = localStorage.getItem('numPpl');

    if (this.booking.selectedTiming == null) router.push('/select-timing');
    else if (this.booking.numPpl == null) router.push('/num-people');
    else {
      this.booking.numPpl = parseInt(this.booking.numPpl);
    }
  },
  mounted() {
    // initialize recaptcha
    window.verifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        callback: () => (this.completedCaptcha = true),
      },
      auth
    );
    window.verifier.render();
  },
  methods: {
    async submit() {
      this.invalidName = this.name.trim().length == 0;
      if (this.invalidName) return;
      this.isProcessing = true;
      const slotsRemaining = await DbService.getAllTours();

      const possibleGroups = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      var highestSlotTourId;
      var highestSlots = 0;
      for (const group of possibleGroups) {
        const tourId = this.booking.selectedTiming + '_' + group;
        if (slotsRemaining[tourId] >= this.booking.numPpl) {
          if (slotsRemaining[tourId] > highestSlots) {
            highestSlots = slotsRemaining[tourId];
            highestSlotTourId = tourId;
            if (highestSlots == 12) break;
          }
          // finish booking here
        }
      }

      if (typeof highestSlotTourId !== 'undefined') {
        const bookingId = await DbService.submitBooking(
          highestSlotTourId,
          this.name,
          parseInt(this.booking.numPpl)
        );
        localStorage.setItem('bookingId', bookingId);
        localStorage.setItem('tourId', highestSlotTourId);

        // watch animation for 2 seconds
        await new Promise((r) => setTimeout(r, 2000));

        this.$router.push('/booking-pass');
        return;
      }

      this.$router.push('/slots-taken');
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  color: white;
  padding: 30px;

  h1 {
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: 700;
    background-image: linear-gradient(45deg, #00a499, #006760);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  p {
    margin-bottom: 36px;
    font-size: 16px;
    font-weight: 500;
  }
}

#recaptcha-container {
  margin-top: 20px;
}

.processing {
  align-items: center;
  justify-content: center;

  span {
    margin-top: 30px;
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
