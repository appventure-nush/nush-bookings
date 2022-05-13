<template>
  <div class="select-timing">
    <h1>Choose a time</h1>
    <h4>Morning</h4>
    <div class="grid">
      <TimingCard
        v-for="timing in [900, 1000, 1100, 1200]"
        :key="timing"
        :timing="timing"
        subtitle="12 left"
        :selected="timing === sel"
        @click="sel = timing"
      />
    </div>
    <div style="height: 36px"></div>
    <h4>Afternoon</h4>
    <div class="grid">
      <TimingCard
        v-for="timing in [1300, 1400, 1500, 1600, 1700, 1800, 1900]"
        :key="timing"
        :timing="timing - 1200"
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

export default {
  components: { TimingCard, Steps },
  setup() {
    const router = useRouter();
    const sel = ref(0);

    function saveTimingAndContinue() {
      localStorage.setItem('selectedTiming', sel.value);
      router.push('/select-route');
    }

    return { sel, saveTimingAndContinue };
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
