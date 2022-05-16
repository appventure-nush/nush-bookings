<template>
  <div class="number-of-people">
    <h1>Number of people</h1>
    <p>
      Tour selected: {{ titleFormatted }}. You can sign up for the rest of your
      family. How many people are you signing up for?
    </p>
    <div style="align-self: center">
      <NumberSelect v-model="numPpl" :maxNum="slots_free" />
    </div>
    <div class="spacer"></div>
    <Steps :numSteps="5" :currentStep="3" @continue="saveNumPplAndContinue" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NumberSelect from '@/components/NumberSelect.vue';
import Steps from '@/components/Steps.vue';
import { formatTiming } from '@/utils/formatTiming';
import DbService from '../api/DbService';

export default {
  components: { NumberSelect, Steps },
  data() {
    return {
      slots_free: 4,
    };
  },
  setup() {
    const router = useRouter();
    const numPpl = ref(1);

    function saveNumPplAndContinue() {
      localStorage.setItem('numPpl', numPpl.value);
      router.push('/phone-number');
    }

    const selectedRoute = localStorage.getItem('selectedRoute');
    const selectedTiming = localStorage.getItem('selectedTiming');

    const titleFormatted =
      formatTiming(selectedTiming).toUpperCase() + ', route ' + selectedRoute;

    const tour_id = selectedTiming + '_' + selectedRoute;

    return {
      tour_id,
      titleFormatted,
      numPpl,
      saveNumPplAndContinue,
    };
  },
  methods: {
    async checkSlots() {
      const fromDb = await DbService.getTour(this.tour_id);
      var slotsRemaining = 12;
      if (typeof fromDb.participants !== 'undefined') {
        for (var j = 0; j < fromDb.participants.length; j++) {
          slotsRemaining -= fromDb.participants[j].pax;
        }
      }
      this.slots_free = Math.min(4, slotsRemaining);
    },
  },
  created() {
    this.checkSlots();
  },
};
</script>

<style lang="scss" scoped>
.number-of-people {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  color: white;
  padding: 30px;

  h1 {
    margin-bottom: 24px;
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
    margin-bottom: 60px;
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
