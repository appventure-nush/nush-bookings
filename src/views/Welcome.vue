<template>
  <div class="welcome">
    <img src="@/assets/img/school_logo.png" height="54" width="100" />
    <h1>NUS High School Tour</h1>
    <p>
      The tour will take roughly 30 minutes, giving you an overview of our
      school's main facilities from the labs, to the lounge to the library.
    </p>
    <div style="height: 20px"></div>
    <p>
      To let everyone have a chance to experience the tour, please do not sign
      up for more than one timing.
    </p>
    <div style="height: 50px"></div>
    <MyButton text="Sign up" @click="signUp" />
    <div class="spacer"></div>
    <span class="credits">By Jia Jie, Dave, Teck Kong, Prannaya</span>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import MyButton from '@/components/MyButton.vue';

export default {
  components: {
    MyButton,
  },
  setup() {
    const router = useRouter();
    function signUp() {
      router.push('/select-timing');
    }
    return { signUp };
  },
};
</script>

<style lang="scss" scoped>
.welcome {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  padding: 40px;

  h1 {
    margin-top: 76px;
    margin-bottom: 48px;
    margin-right: 80px;
    font-size: 36px;
    font-weight: 700;
    background-image: linear-gradient(45deg, #00a499, #003f3b);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  p {
    color: rgba(white, 0.8);
    font-size: 18px;
    font-weight: 500;
  }

  .credits {
    color: rgba(#fff, 0.6);
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
