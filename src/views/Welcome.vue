<template>
  <Transition>
    <Dialog
      v-if="showDialog"
      title="About"
      message="This site was built by a team of Year 5 students at NUS High School,
      composed of Lee Jia Jie, Tan Kai Xun Dave, Lim Teck Kong and Prannaya
      Gupta, with support from the NUS High Students' Council and AppVenture,
      the Computer Science Interest Group of NUS High."
      @close="showDialog = false"
    />
  </Transition>
  <div class="welcome">
    <img src="@/assets/img/school_logo.png" height="54" width="100" />
    <h1>NUS High School Tour</h1>
    <p>
      The tour will take roughly 30 minutes, giving you an overview of our
      school's main facilities from the labs, to the lounge to the library.
    </p>
    <div style="height: 18px"></div>
    <p>
      To let everyone have a chance to experience the tour, please do not sign
      up for more than one timing.
    </p>
    <div style="height: 50px"></div>
    <MyButton text="Sign up" :onClick="signUp" />
    <div class="spacer"></div>
    <span class="credits" @click="showDialog = true">
      By Jia Jie, Dave, Teck Kong, Prannaya
    </span>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MyButton from '@/components/MyButton.vue';
import Dialog from '@/components/Dialog.vue';

export default {
  components: {
    MyButton,
    Dialog,
  },
  setup() {
    const router = useRouter();
    const showDialog = ref(false);
    function signUp() {
      router.push('/select-timing');
    }
    return { showDialog, signUp };
  },
};
</script>

<style lang="scss" scoped>
.welcome {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  padding: 36px;

  h1 {
    margin-top: 68px;
    margin-bottom: 36px;
    margin-right: 64px;
    font-size: 32px;
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
    font-size: 16px;
    font-weight: 500;
  }

  .credits {
    color: rgba(#fff, 0.4);
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
