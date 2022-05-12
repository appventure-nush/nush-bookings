<template>
  <div class="button">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: String,
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
  background-image: linear-gradient(45deg, #217ea2, #00a499);
  color: black;
  font-size: 20px;
  font-weight: 700;
}
</style>
