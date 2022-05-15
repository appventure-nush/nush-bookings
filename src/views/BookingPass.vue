<template>
  <div class="select-timing">
    <h1>Booking Pass</h1>
    <h4 v-show="bookingDone">You're all set!</h4>
    <h4 v-show="bookingDone">Tour has been confirmed</h4>
    <h4 v-show="bookingDone">Phone number:</h4>
    <h4 v-show="bookingDone">Number of Pax:</h4>
    <h4 v-show="bookingDone">Timing:</h4>
    <h4 v-show="bookingDone">Venue:</h4>
    <h4 v-show="bookingDone">Ticket Number:</h4>
    <button v-show="bookingDone">Cancel Booking</button>
    <h4>
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
    };
  },
  setup() {
    const router = useRouter();
    function returnMainPage() {
      router.push('../');
    }
    return { returnMainPage };
  },
};
</script>
