<template>
  <div class="select-route">
    <h1>Choose a route</h1>
    <p>Routes start and end differently but all cover the same locations.</p>
    <h4>{{ timingFormatted }}</h4>
    <div class="routes-list">
      <RouteCard
        v-for="route in routes"
        :key="route.id"
        :title="route.title"
        :subtitle="route.location"
        :subtitle2="route.spotsLeft + ' left'"
        :selected="route.id === sel"
        @click="sel = route.id"
      />
    </div>
    <div class="spacer"></div>
    <Steps :numSteps="5" :currentStep="2" @continue="saveRouteAndContinue" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RouteCard from '@/components/RouteCard.vue';
import Steps from '@/components/Steps.vue';
import { formatTiming } from '@/utils/formatTiming';

const ROUTES = [
  { id: 'A', title: 'Route A', location: 'Concourse', spotsLeft: 12 },
  { id: 'B', title: 'Route B', location: 'Level 4', spotsLeft: 12 },
  { id: 'C', title: 'Route C', location: 'Amphitheatre', spotsLeft: 12 },
];

export default {
  components: { RouteCard, Steps },
  setup() {
    const router = useRouter();
    const sel = ref(localStorage.getItem('selectedTiming'));

    const selectedTiming = localStorage.getItem('selectedTiming');
    const timingFormatted = formatTiming(selectedTiming);

    function saveRouteAndContinue() {
      localStorage.setItem('selectedRoute', sel.value);
      router.push('/num-people');
    }

    return { routes: ROUTES, timingFormatted, sel, saveRouteAndContinue };
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
