<template>
  <div v-if="page === 'phoneNumber'" class="page">
    <h1>Phone number</h1>
    <p>Please enter your phone number below. You will receive an OTP</p>
    <PhoneField
      v-model="phoneNumber"
      :error="invalidPhoneNumber ? 'Enter a valid phone number' : null"
    />
    <div id="recaptcha-container"></div>
    <div class="spacer"></div>
    <Steps
      :numSteps="5"
      :currentStep="4"
      :canContinue="completedCaptcha"
      @continue="submitPhoneNumber"
    />
  </div>
  <div v-else-if="page === 'enterOTP'" class="page">
    <h1>Verification</h1>
    <p>
      A 6-digit OTP was sent to <b>{{ phoneNumber }}</b
      >. Enter it below:
    </p>
    <input
      type="text"
      class="otp-input"
      :class="{ error: invalidOTP }"
      v-model="otp"
    />
    <span v-if="invalidOTP" class="error-msg">Invalid OTP</span>
    <div class="spacer"></div>
    <Steps :numSteps="5" :currentStep="5" @continue="submitOTP" />
  </div>
  <div v-else-if="page === 'processing'" class="processing page">
    <Loading />
    <span>Processing</span>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import PhoneField from '@/components/PhoneField.vue';
import Steps from '@/components/Steps.vue';
import Loading from '@/components/Loading.vue';
import DbService from '../api/DbService';

const auth = getAuth();

export default {
  components: { PhoneField, Steps, Loading },
  data() {
    return {
      booking: {},
      page: 'phoneNumber', // phoneNumber | enterOTP | processing
      phoneNumber: '',
      otp: '',
      completedCaptcha: false,
      invalidPhoneNumber: false,
      invalidOTP: false,
      // verifier: null,
    };
  },
  created() {
    const router = useRouter();

    const FIELDS = ['selectedTiming', 'selectedRoute', 'numPpl'];
    const PAGES = ['select-timing', 'select-route', 'num-people'];
    for (const i in FIELDS) {
      const value = localStorage.getItem(FIELDS[i]);
      if (value == null) {
        router.push('/' + PAGES[i]);
        return {};
      }
      this.booking[FIELDS[i]] = value;
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
    submitPhoneNumber() {
      // save phone number, send otp, continue to verification page
      this.invalidPhoneNumber = !/^\+65[0-9]{8}$/.test(this.phoneNumber);
      if (this.invalidPhoneNumber) return;
      signInWithPhoneNumber(auth, this.phoneNumber, window.verifier)
        .then((result) => {
          this.page = 'enterOTP';
          window.confirmRes = result;
        })
        .catch(() => {
          // TODO: reset?
          // sms not sent or smth
        });
    },
    submitOTP() {
      this.invalidOTP = !/^[0-9]{6}$/.test(this.otp);
      if (this.invalidOTP) return;
      window.confirmRes
        .confirm(this.otp)
        .then(async () => {
          this.page = 'processing';
          const allTours = await DbService.getAllTours();
          const tourId =
            this.booking.selectedTiming + '_' + this.booking.selectedRoute;
          const slotsRemaining = allTours[tourId];

          // watch animation for 2 seconds
          await new Promise((r) => setTimeout(r, 2000));

          // submit booking
          if (slotsRemaining >= parseInt(this.booking.numPpl)) {
            await DbService.submitBooking(
              tourId,
              this.phoneNumber,
              parseInt(this.booking.numPpl)
            );
            this.$router.push('/booking-pass');
          } else {
            await auth.signOut();
            this.$router.push('/slots-taken');
          }
        })
        .catch(() => {
          this.invalidOTP = true;
        });
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

.otp-input {
  height: 54px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #333;
  border-radius: 10px;
  outline: none;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 700;
  border-width: 1px;

  &.error {
    border: 1px solid red;
  }
}

.error-msg {
  color: #d42727;
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  margin-left: 12px;
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
