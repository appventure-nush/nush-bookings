<template>
  <div class="number-of-people">
    <h1>Number of people</h1>
    <p>
      You can sign up for the rest of your family. How many people are you
      signing up for?
    </p>
    <div style="align-self: center">
      <NumberSelect v-model="numPpl" :maxNum="4" />
    </div>
    <div class="spacer"></div>
    <Steps :numSteps="4" :currentStep="3" @continue="saveNumPplAndContinue" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NumberSelect from '@/components/NumberSelect.vue';
import Steps from '@/components/Steps.vue';

export default {
  components: { NumberSelect, Steps },
  setup() {
    const router = useRouter();
    const numPpl = ref(1);

    function saveNumPplAndContinue() {
      localStorage.setItem('numPpl', numPpl.value);
      router.push('/phone-number');
    }

    return { numPpl, saveNumPplAndContinue };
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
