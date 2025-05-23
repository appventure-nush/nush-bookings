<template>
  <div class="number-select">
    <div
      v-for="i in maxNum"
      :key="i"
      class="number"
      :class="{ selected: i === modelValue }"
      @click="$emit('update:modelValue', i)"
    >
      {{ i }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    maxNum: Number,
  },
};
</script>

<style lang="scss" scoped>
.number-select {
  display: flex;
  gap: 12px;
}

.number {
  padding: 12px 12px 8px 12px;
  border: 1px solid #5f5f5f;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;

  color: rgba(white, 0.9);
  font-size: 24px;
  font-weight: 700;
  transition: background-color 200ms ease-in-out;

  &.selected {
    color: white;
    border-color: transparent;
    background-color: #444;
  }
}
</style>
