<template>
  <Transition>
    <Dialog
      v-if="showDialog"
      title="About"
      message="This site was built by a team of Year 4 to 6 students in NUS High School,
      composed of Lee Jia Jie, Tan Kai Xun Dave, Tan Yong Tat, Dedeep Sai Vadapalli, Lim Teck Kong and Prannaya
      Gupta, with support from the NUS High Students' Council and AppVenture,
      the Computer Science Interest Group of NUS High."
      @close="showDialog = false"
    />
  </Transition>
  <div class="welcome">
    <img src="@/assets/img/school_logo.png" height="54" width="100" />
    <h1>NUS High School Tour</h1>
    <p>
      The tour will start from the Event Horizon and take roughly 30 minutes,
      giving you an overview of our school's main facilities from the labs to
      the lounges.
    </p>
    <div style="height: 18px"></div>
    <p>
      It is <u>compulsory</u> to book for a tour. Please do not sign up for more
      than one timing.
    </p>
    <div style="height: 50px"></div>
    <MyButton text="Sign up" :onClick="signUp" />
    <div style="height: 4px"></div>
    <OutlinedButton text="Toggle Font Size" :onClick="toggleFontSize" />
    <div class="spacer"></div>
    <span class="credits" @click="showDialog = true">
      By Jia Jie, Dave, Yong Tat, Sai, Teck Kong, Prannaya
    </span>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MyButton from '@/components/MyButton.vue';
import OutlinedButton from '@/components/OutlinedButton.vue';
import Dialog from '@/components/Dialog.vue';
import { bigFontSize } from '@/states';

export default {
  components: {
    MyButton,
    OutlinedButton,
    Dialog,
  },
  setup() {
    const router = useRouter();
    const showDialog = ref(false);

    // This makes it such that when returning to this page, you have to press the button twice to change the font size back.
    // I don't know how to fix it so I'll leave it here :skull:
    function signUp() {
      router.push('/select-timing');
    }
    function toggleFontSize() {
      bigFontSize.toggle();
      if (bigFontSize.value) {
        document.body.setAttribute('data-fontsize', 'large');
      } else {
        document.body.setAttribute('data-fontsize', 'small');
      }
    }
    return { showDialog, signUp, toggleFontSize };
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
    font-size: var(--normal-text-size);
    font-weight: 500;
  }

  .credits {
    color: rgba(#fff, 0.4);
    font-size: var(--smaller-text-size);
    font-weight: 500;
  }
}
</style>
