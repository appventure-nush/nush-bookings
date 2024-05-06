<template>
  <div class="select-timing">
    <h1>Choose a time</h1>
    <div v-if="loading" class="loading">Fetching timeslots...</div>
    <div v-else class="column-scroll">
      <h4 v-if="noSlots" style="margin-top: 32px">
        It seems no slots are available...
      </h4>
      <div v-else>
        <h4 v-if="showMorning">Morning</h4>
        <div v-if="showMorning" class="grid">
          <TimingCard
            v-for="[timing, numSlots] in morningSlots"
            :key="timing"
            :timing="timing"
            :subtitle="`${numSlots} pax left`"
            :selected="timing == sel"
            @click="selectTiming(timing)"
          />
        </div>
        <h4 style="margin-top: 32px">Afternoon</h4>
        <div class="grid">
          <TimingCard
            v-for="[timing, numSlots] in afternoonSlots"
            :key="timing"
            :timing="timing - 1200"
            :subtitle="`${numSlots} pax left`"
            :selected="timing == sel"
            @click="selectTiming(timing)"
          />
        </div>
      </div>
    </div>
    <div style="margin-top: 30px">
      <Steps
        :numSteps="3"
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
      noSlots: false,
    };
  },
  setup() {
    const router = useRouter();
    const sel = ref(parseInt(localStorage.getItem('selectedTiming') ?? 0));

    function selectTiming(timing) {
      sel.value = timing;
      localStorage.setItem('selectedTiming', sel.value);
    }

    function saveTimingAndContinue() {
      router.push('/num-people');
    }

    return { sel, selectTiming, saveTimingAndContinue };
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
        const list = timing < 1200 ? morningSlots : afternoonSlots;
        list[timing] = Math.max(list[timing] ?? 0, numSlots);
      }

      this.noSlots =
        Object.keys(morningSlots).length == 0 &&
        Object.keys(afternoonSlots).length == 0;

      this.morningSlots = Object.entries(morningSlots);
      this.afternoonSlots = Object.entries(afternoonSlots);

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
    font-size: var(--bigger-text-size);
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
