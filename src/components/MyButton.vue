<template>
  <div
    class="button"
    :class="{ disabled, down: isDown }"
    @pointerdown="onDown"
    @pointerup="onUp"
    @pointercancel="onCancel"
  >
    {{ text }}
  </div>
</template>

<script>
// DONT use @click event listener since have to wait for animation to end
export default {
  props: {
    text: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      clickStart: 0,
      isDown: false,
    };
  },
  methods: {
    onDown() {
      if (this.disabled) return;
      this.isDown = true;
      this.clickStart = Date.now();
    },
    onUp() {
      if (this.disabled) return;
      setTimeout(() => {
        this.onClick();
        this.isDown = false;
      }, 600 - (Date.now() - this.clickStart));
    },
    onCancel() {
      this.isDown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  width: fit-content;
  height: 50px;
  padding-left: 28px;
  padding-right: 28px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: black;
  font-size: 18px;
  font-weight: 700;
  user-select: none;
  cursor: pointer;

  background-image: linear-gradient(90deg, #3865a8 0 60%, #00a499);
  background-size: 400% 100%;
  background-position: 100%;
  transition: background-position 2s;

  &.down {
    background-position: 0% 0%;
  }

  &.disabled {
    background-image: none;
    background-color: #234a48;
  }
}
</style>
