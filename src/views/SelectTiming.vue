<template>
  <div class="select-timing">
    <h1>Choose a time</h1>
    <h4>Morning</h4>
    <div class="grid">
      <TimingCard
        v-for="timing in morning_time_slot"
        :key="timing"
        :timing="timing.time"
        :subtitle="`${timing.slots} slots left`"
        :selected="timing === sel"
        @click="sel = timing"
      />
    </div>
    <div style="height: 36px"></div>
    <h4>Afternoon</h4>
    <div class="grid">
      <TimingCard
        v-for="timing in afternoon_time_slot"
        :key="timing"
        :timing="timing.time - 1200"
        subtitle="12 left"
        :selected="timing === sel"
        @click="sel = timing"
      />
    </div>
    <div class="spacer"></div>
    <Steps :numSteps="4" :currentStep="1" @continue="saveTimingAndContinue" />
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
      morning_time_slot: [
        {
          time: 900,
          slots: 12,
        },
        {
          time: 930,
          slots: 8,
        },
      ],
      afternoon_time_slot: [
        {
          time: 1400,
          slots: 12,
        },
        {
          time: 1430,
          slots: 8,
        },
      ],
    };
  },
  setup() {
    const router = useRouter();
    const sel = ref(0);

    function saveTimingAndContinue() {
      localStorage.setItem('selectedTiming', sel.value);
      console.log(sel.value);
      router.push('/select-route');
    }

    return { sel, saveTimingAndContinue };
  },
  methods: {
    async loadAllTours() {
      this.loading = true;
      var time_route_slots = [];
      const fromDb = await DbService.getAllTours();
      for (var i = 0; i < fromDb.length; i++) {
        var obj = fromDb[i];
        var slotRemaining = 12;
        for (var j = 0; j < obj.participants; j++) {
          slotRemaining -= obj.participants[0].pax;
        }
        console.log(obj.time);
        time_route_slots.push({
          time: obj.time.integerValue,
          slots: slotRemaining,
        });
      }
      var morningTimings = [
        900, 910, 920, 930, 940, 950, 1000, 1010, 1020, 1030, 1040, 1050, 1100,
        1110, 1120, 1130, 1140, 1150,
      ];

      var afternoonTimings = [
        1200, 1210, 1220, 1230, 1240, 1250, 1300, 1310, 1320, 1330, 1340, 1350,
        1400, 1410, 1420, 1430, 1440, 1450, 1500, 1510, 1520, 1530,
      ];
      var morning_time_slots = [];
      for (var t = 0; t < morningTimings.length; t++) {
        morning_time_slots.push({
          time: morningTimings[t],
          slots: 0,
        });
      }
      for (t = 0; t < morning_time_slots.length; t++) {
        for (j = 0; j < time_route_slots.length; j++) {
          if (morning_time_slots[t].time == time_route_slots[j].time) {
            morning_time_slots[t].slots = Math.max(
              morning_time_slots[t].slots,
              time_route_slots[j].slots
            );
          }
        }
      }
      var afternoon_time_slots = [];
      for (t = 0; t < afternoonTimings.length; t++) {
        afternoon_time_slots.push({
          time: afternoonTimings[t],
          slots: 0,
        });
      }
      for (t = 0; t < afternoon_time_slots.length; t++) {
        for (j = 0; j < time_route_slots.length; j++) {
          if (afternoon_time_slots[t].time == time_route_slots[j].time) {
            afternoon_time_slots[t].slots = Math.max(
              afternoon_time_slots[t].slots,
              time_route_slots[j].slots
            );
          }
        }
      }
      this.morning_time_slot = morning_time_slots;
      this.afternoon_time_slot = afternoon_time_slots;
      console.log(fromDb);
      this.loading = false;
    },
  },
  created() {
    this.loadAllTours();
  },
};
</script>

<style lang="scss" scoped>
.select-timing {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  color: white;
  padding: 30px;

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
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 16px;
  row-gap: 14px;
}
</style>
