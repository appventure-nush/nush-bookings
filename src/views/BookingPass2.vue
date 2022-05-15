<template>
  <div class="select-timing">
    <h1>Booking Pass</h1>
    <h4 v-show="bookingDone">You're all set!</h4>
    <h4 v-show="bookingDone">Tour has been confirmed</h4>
    <h4 v-show="bookingDone" id="sampleDate">
      Phone number: {{ phoneNumber }}
    </h4>
    <img
      v-show="privateNumber"
      id="sampleDate"
      @click="privateNumberChange"
      src="@/assets/img/bi_eye-slash-fill.png"
      height="25"
      width="40"
    />
    <img
      v-show="!privateNumber"
      id="sampleDate"
      @click="privateNumberChange"
      src="@/assets/img/bi_eye-fill.png"
      height="25"
      width="40"
    />
    <h4 v-show="bookingDone">Number of Pax: {{ paxNumber }}</h4>
    <h4 v-show="bookingDone">Timing: {{ timing }}</h4>
    <h4 v-show="bookingDone">Venue: {{ venue }}</h4>
    <h4 v-show="bookingDone">Ticket Number: {{ ticketNumber }}</h4>
    <MyButton
      v-show="bookingDone"
      text="Cancel Booking?"
      @click="returnMainPage"
    />
    <h4 v-show="!bookingDone">
      Oops... Seems like you have yet to register. Return to the main page to
      register!
    </h4>
    <MyButton
      v-show="!bookingDone"
      text="Return to Main Page"
      @click="returnMainPage"
    />
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import MyButton from '@/components/MyButton.vue';

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      bookingDone: true,
      phoneNumber: '',
      paxNumber: '',
      timing: '',
      venue: '',
      ticketNumber: '',
      privateNumber: true,
    };
  },
  async created() {
    this.phoneNumber = '800000';
    this.paxNumber = '4445';
    this.timing = '11:00am';
    this.venue = 'Audi';
    this.ticketNumber = 'r123455';
  },
  setup() {
    const router = useRouter();
    function returnMainPage() {
      router.push('../');
    }
    function privateNumberChange() {
      if (this.privateNumber == false) {
        this.privateNumber = true;
        console.log(this.privateNumber);
        this.phoneNumber = '****';
        console.log(this.phoneNumber);
      } else {
        this.privateNumber = false;
        console.log('testsss');
      }
    }
    return { returnMainPage, privateNumberChange };
  },
};
</script>

<style lang="scss" scoped>
.select-timing {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  padding: 40px;

  h1 {
    margin-bottom: 36px;
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
  h4 {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    color: white;
  }
  #sampleDate {
    display: inline;
  }
}
</style>
