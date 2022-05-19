<template>
  <div class="select-route">
    <h1>Choose a route</h1>
    <p>
      Routes start and end differently but <b>all cover the same locations</b>.
    </p>
    <div v-if="loading" class="loading">Fetching routes...</div>
    <div v-else class="column-scroll">
      <h4>{{ timingFormatted }}</h4>
      <div class="routes-list">
        <RouteCard
          v-for="route in routes"
          :key="route.id"
          :title="route.title"
          :subtitle="'Starts at ' + route.location"
          :subtitle2="route.pax + ' left'"
          :selected="route.id === sel"
          @click="sel = route.id"
        />
      </div>
    </div>
    <div style="margin-top: 30px">
      <Steps
        :numSteps="5"
        :currentStep="2"
        :canContinue="sel != null"
        @continue="saveRouteAndContinue"
      />
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
import { getTourLocation } from '../utils/tourLocation';

export default {
  components: { RouteCard, Steps },
  data() {
    return {
      loading: false,
    };
  },
  setup() {
    const router = useRouter();
    const sel = ref(localStorage.getItem('selectedRoute'));

    const selectedTiming = localStorage.getItem('selectedTiming');
    const timingFormatted = formatTiming(selectedTiming);

    function saveRouteAndContinue() {
      localStorage.setItem('selectedRoute', sel.value);
      router.push('/num-people');
    }

    return {
      routes: [],
      selectedTiming,
      timingFormatted,
      sel,
      saveRouteAndContinue,
    };
  },
  created() {
    this.loadRoutes();
  },
  methods: {
    async loadRoutes() {
      this.loading = true;
      const selectedTiming = localStorage.getItem('selectedTiming');
      const allTours = await DbService.getAllToursCached();
      const routes = [];
      for (const [tourId, numSlots] of Object.entries(allTours)) {
        if (tourId.startsWith(selectedTiming) && numSlots > 0) {
          const id = tourId.split('_')[1];
          routes.push({
            id,
            title: 'Route ' + id,
            location: getTourLocation(id),
            pax: numSlots,
          });
        }
      }
      this.routes = routes.sort((a, b) => a.id.localeCompare(b.id));
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.select-route {
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
    margin-bottom: 44px;
    font-size: 16px;
    font-weight: 500;
  }

  h4 {
    margin-bottom: 18px;
    font-size: 18px;
    font-weight: 700;
  }
}

.routes-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.loading {
  flex-grow: 1;
  display: grid;
  place-items: center;
}
</style>
