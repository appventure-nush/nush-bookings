<template>
  <div class="select-route">
    <h1>Choose a route</h1>
    <p>Routes start and end differently but all cover the same locations.</p>
    <div class="column-scroll">
      <h4>{{ timingFormatted }}</h4>
      <div class="routes-list">
        <RouteCard
          v-for="route in routes"
          :key="route.id"
          :title="route.title"
          :subtitle="'Starts at ' + route.location"
          :subtitle2="route.spotsLeft + ' left'"
          :selected="route.id === sel"
          @click="sel = route.id"
        />
      </div>
    </div>
    <div style="margin-top: 30px">
      <Steps :numSteps="5" :currentStep="2" @continue="saveRouteAndContinue" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RouteCard from '@/components/RouteCard.vue';
import Steps from '@/components/Steps.vue';
import { formatTiming } from '@/utils/formatTiming';
import DbService from '../api/DbService';

const ROUTES = [
  { id: 'A', title: 'Route A', location: 'Concourse', spotsLeft: 12 },
  { id: 'B', title: 'Route B', location: 'Level 4', spotsLeft: 12 },
  { id: 'C', title: 'Route C', location: 'Amphitheatre', spotsLeft: 12 },
];

export default {
  components: { RouteCard, Steps },
  data() {
    return {
      routes: ROUTES,
    };
  },
  setup() {
    const router = useRouter();
    const sel = ref(localStorage.getItem('selectedTiming'));

    const selectedTiming = localStorage.getItem('selectedTiming');
    const timingFormatted = formatTiming(selectedTiming);

    function saveRouteAndContinue() {
      localStorage.setItem('selectedRoute', sel.value);
      router.push('/num-people');
    }

    return {
      selectedTiming,
      timingFormatted,
      sel,
      saveRouteAndContinue,
    };
  },
  methods: {
    async loadToursTime() {
      const fromDb = await DbService.getTourByTime(
        parseInt(this.selectedTiming)
      );

      var routes_time = [];
      for (var i = 0; i < fromDb.length; i++) {
        var tour = fromDb[i];
        var slotsRemaining = 12;
        if (typeof tour.participants.arrayValue.values !== 'undefined') {
          for (var j = 0; j < tour.participants.arrayValue.values.length; j++) {
            slotsRemaining -=
              tour.participants.arrayValue.values[j].mapValue.fields.pax
                .integerValue;
          }
        }

        var loc = 'temp';

        switch (tour.route.stringValue[0]) {
          case 'A':
            loc = 'Theatrette';
            break;
          case 'B':
            loc = 'Year 1 Classrooms';
            break;
          case 'C':
            loc = 'The House Murals';
            break;
          case 'D':
            loc = 'Ecopond';
            break;
        }

        routes_time.push({
          title: 'Route ' + tour.route.stringValue,
          id: tour.route.stringValue,
          location: loc,
          spotsLeft: slotsRemaining,
        });
      }

      this.routes = routes_time;
    },
  },
  created() {
    this.loadToursTime();
  },
};
</script>

<style lang="scss" scoped>
.select-route {
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
    margin-bottom: 50px;
    font-size: 18px;
    font-weight: 500;
  }

  h4 {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
  }
}

.routes-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
