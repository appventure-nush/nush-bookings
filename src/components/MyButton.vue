<template>
  <div class="button" :class="{ disabled }">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.button {
  width: fit-content;
  height: 52px;
  padding-left: 32px;
  padding-right: 32px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  user-select: none;
  cursor: pointer;

  background-image: linear-gradient(45deg, #3865a8, #00a499);
  background-size: 200% 100%;
  background-position: 100%;
  transition: background-position 400ms;

  &:active {
    background-position: 0% 0%;
  }

  &.disabled {
    background-image: none;
    background-color: #234a48;
  }
}
</style>
