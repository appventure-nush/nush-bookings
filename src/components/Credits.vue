<template>
  <div class="dialog">
    <h1>Credits</h1>
    <p>
      This site was built by a team of Year 5 students at NUS High School,
      composed of Lee Jia Jie, Dave Tan Kai Xun, Lim Teck Kong and Prannaya
      Gupta, with support from the NUS High Students' Council and AppVenture,
      the Computer Science Interest Group of NUS High.
    </p>
    <div class="options">
      <div class="btn highlight" @click="$emit('close')">Close</div>
    </div>
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
.dialog {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 14px 30px rgba(#000, 0.15);
  padding: 24px 24px 20px 24px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    margin-bottom: 28px;
  }

  .options {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }

  .btn {
    width: 70px;
    height: 36px;
    display: grid;
    place-items: center;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    transition: background-color 200ms;

    &.highlight {
      color: #00a499;
    }

    &:active {
      background-color: rgba(#000, 0.1);
    }
  }
}
</style>
