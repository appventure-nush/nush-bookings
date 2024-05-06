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
    return {};
  },
  methods: {
    onUp() {
      if (this.disabled) return;
      this.onClick();
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
  color: rgba(white, 0.8);
  font-size: 18px;
  font-weight: 700;
  user-select: none;
  cursor: pointer;

  border-style: solid;
  border-width: 1px;
  border-color: rgba(white, 0.8);
}
</style>
