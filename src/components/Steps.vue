<template>
  <div class="steps">
    <div
      v-for="index in numSteps"
      :key="index"
      class="circle"
      :class="{ current: index === currentStep }"
    ></div>
    <div class="spacer"></div>
    <MyButton
      text="Continue"
      :disabled="!canContinue"
      :onClick="() => canContinue && $emit('continue')"
    />
  </div>
</template>

<script>
import MyButton from '@/components/MyButton.vue';

export default {
  components: { MyButton },
  props: {
    numSteps: Number,
    currentStep: Number,
    canContinue: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  align-items: center;
  padding-left: 20px;

  .circle {
    margin-right: 12px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #00a499;
    opacity: 0.4;

    &.current {
      opacity: 1;
    }
  }
}
</style>
