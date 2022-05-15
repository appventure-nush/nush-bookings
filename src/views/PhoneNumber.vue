<template>
  <div class="number-of-people">
    <h1>Phone number</h1>
    <p>Please enter your phone number below. You will receive an OTP</p>
    <PhoneField v-model="phoneNumber" />
    <div class="spacer"></div>
    <Steps
      :numSteps="4"
      :currentStep="3"
      @continue="savePhoneNumberAndContinue"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PhoneField from '../components/PhoneField.vue';
import Steps from '@/components/Steps.vue';

export default {
  components: { PhoneField, Steps },
  setup() {
    const router = useRouter();
    const phoneNumber = ref('');

    function savePhoneNumberAndContinue() {
      localStorage.setItem('phoneNumber', phoneNumber.value);
      router.push('/process');
    }

    return { phoneNumber, savePhoneNumberAndContinue };
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
    margin-bottom: 36px;
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
