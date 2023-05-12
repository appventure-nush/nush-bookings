<template>
  <div class="number-of-people">
    <h1>Number of people</h1>
    <p>
      Tour selected: {{ formattedTiming }}.<br />
      <br />
      You can sign up for the rest of your family/group. How many people are you
      signing up for?
    </p>
    <div style="align-self: center">
      <NumberSelect v-model="numPpl" :maxNum="slotsFree" />
    </div>
    <div class="spacer"></div>
    <Steps
      :numSteps="3"
      :currentStep="2"
      :canContinue="numPpl !== 0"
      @continue="saveNumPplAndContinue"
    />
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
      slotsFree: 4,
    };
  },
  setup() {
    const router = useRouter();
    const numPpl = ref(parseInt(localStorage.getItem('numPpl') ?? 0));

    function saveNumPplAndContinue() {
      localStorage.setItem('numPpl', numPpl.value);
      router.push('/input-name');
    }

    const formattedTiming = formatTiming(
      localStorage.getItem('selectedTiming')
    ).toUpperCase();

    return {
      numPpl,
      formattedTiming,
      saveNumPplAndContinue,
    };
  },
  methods: {
    async checkSlots() {
      const selectedTiming = localStorage.getItem('selectedTiming');
      const allTours = await DbService.getAllToursCached();
      const possibleGroups = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      let slotsFree = 0;
      for (const group of possibleGroups) {
        const remainingSlots = allTours[selectedTiming + '_' + group];
        if (remainingSlots > slotsFree) {
          slotsFree = remainingSlots;
        }
        if (slotsFree >= 4) break;
      }
      this.slotsFree = Math.min(4, slotsFree);
    },
  },
  created() {
    this.checkSlots();
  },
};
</script>

<style lang="scss" scoped>
.number-of-people {
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
    margin-bottom: 60px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
