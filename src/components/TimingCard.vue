<template>
  <div class="timing-card" :class="{ selected: selected }">
    <span class="timing">{{ timingFormatted }}</span>
    <span class="subtitle">{{ subtitle }}</span>
  </div>
</template>

<script>
import { formatTiming } from '../utils/formatTiming';

export default {
  props: {
    timing: Number,
    subtitle: String,
    selected: Boolean,
  },
  computed: {
    timingFormatted() {
      return formatTiming(this.timing, false);
    },
  },
};
</script>

<style lang="scss" scoped>
.timing-card {
  display: flex;
  flex-direction: column;
  padding: 8px 12px 8px 12px;
  border-radius: 10px;
  border: 1px solid #4e4e4e;
  user-select: none;
  cursor: pointer;

  transition: background-color 200ms ease-in-out;

  &.selected {
    border-color: transparent;
    background-color: #444;
  }

  .timing {
    color: rgba(#fff, 0.8);
    font-size: var(--normal-text-size);
    font-weight: 700;
    margin-bottom: 4px;
  }

  .subtitle {
    color: rgba(#fff, 0.6);
    font-size: var(--smaller-text-size);
  }
}
</style>
