<template>
  <div class="loading">
    <div class="indicator-1"></div>
    <div class="indicator-2"></div>
    <div class="indicator-3"></div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  gap: 16px;
}

.indicator-1,
.indicator-2,
.indicator-3 {
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #00a499;
}

.indicator-1 {
  animation: updown 800ms infinite;
  animation-direction: alternate;
}

.indicator-2 {
  animation: updown 800ms infinite;
  animation-delay: 200ms;
  animation-direction: alternate;
}

.indicator-3 {
  animation: updown 800ms infinite;
  animation-delay: 400ms;
  animation-direction: alternate;
}

@keyframes updown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-18px);
  }
}
</style>
