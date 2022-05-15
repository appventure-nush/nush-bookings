<template>
  <div class="timing-card" :class="{ selected: selected }">
    <span class="timing">{{ timingFormatted }}</span>
    <span class="subtitle">{{ subtitle }}</span>
  </div>
</template>

<script>
export default {
  props: {
    timing: Number,
    subtitle: String,
    selected: Boolean,
  },
  computed: {
    timingFormatted() {
      return (
        Math.floor(this.timing / 100) +
        '.' +
        ((this.timing % 100) + '').padStart(2, '0')
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.timing-card {
  display: flex;
  flex-direction: column;
  padding: 10px 16px 10px 16px;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;

  border: 1px solid #4e4e4e;

  &.selected {
    border-color: transparent;
    background-color: #444;
  }

  .timing {
    color: rgba(#fff, 0.8);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .subtitle {
    color: rgba(#fff, 0.8);
    font-size: 14px;
  }
}
</style>
