<template>
  <div class="select-timing">
    <h1>Choose a time</h1>
    <div v-if="loading" class="loading">Fetching timeslots...</div>
    <div v-else class="column-scroll">
      <h4 v-if="showMorning">Morning</h4>
      <div v-if="showMorning" class="grid">
        <TimingCard
          v-for="(numSlots, timing) in morningSlots"
          :key="timing"
          :timing="parseInt(timing)"
          :subtitle="`${numSlots} slots left`"
          :selected="timing === sel"
          @click="sel = timing"
        />
      </div>
      <h4 style="margin-top: 32px">Afternoon</h4>
      <div class="grid">
        <TimingCard
          v-for="(numSlots, timing) in afternoonSlots"
          :key="timing"
          :timing="parseInt(timing) - 1200"
          :subtitle="`${numSlots} slots left`"
          :selected="timing === sel"
          @click="sel = timing"
        />
      </div>
    </div>
    <div style="margin-top: 30px">
      <Steps
        :numSteps="5"
        :currentStep="1"
        :canContinue="sel !== 0"
        @continue="saveTimingAndContinue"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TimingCard from '@/components/TimingCard.vue';
import Steps from '@/components/Steps.vue';
import DbService from '../api/DbService';

export default {
  components: { TimingCard, Steps },
  data() {
    return {
      loading: false,
      morningSlots: [],
      afternoonSlots: [],
      showMorning: false,
    };
  },
  setup() {
    const router = useRouter();
    const sel = ref(parseInt(localStorage.getItem('selectedTiming') ?? 0));

    function saveTimingAndContinue() {
      localStorage.setItem('selectedTiming', sel.value);
      router.push('/select-route');
    }

    return { sel, saveTimingAndContinue };
  },
  methods: {
    async loadAllTours() {
      this.loading = true;

      const now = new Date();
      const currentTime = now.getHours() * 100 + now.getMinutes();
      this.showMorning = currentTime < 1200;

      const allTours = await DbService.getAllTours();

      const morningSlots = {};
      const afternoonSlots = {};
      for (const [tourId, numSlots] of Object.entries(allTours)) {
        const timing = parseInt(tourId.split('_')[0]);
        if (timing < currentTime) continue;
        if (numSlots <= 0) continue;
        const obj = timing < 1200 ? morningSlots : afternoonSlots;
        obj[timing] = Math.max(obj[timing] ?? 0, numSlots);
      }
      this.morningSlots = morningSlots;
      this.afternoonSlots = afternoonSlots;
      this.loading = false;
    },
  },
  created() {
    this.loadAllTours();
  },
};
</script>

<style lang="scss">
.select-timing {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  color: white;
  padding: 30px;

  h1 {
    margin-bottom: 32px;
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
    margin-bottom: 18px;
    font-size: 18px;
    font-weight: 700;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 16px;
  row-gap: 14px;
}

.loading {
  flex-grow: 1;
  display: grid;
  place-items: center;
}
</style>
