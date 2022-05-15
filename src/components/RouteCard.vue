<template>
  <div class="route-card" :class="{ selected: selected }">
    <div class="route-details">
      <span class="title">{{ title }}</span>
      <div style="height: 6px"></div>
      <span class="subtitle">{{ subtitle }}</span>
      <div class="circle"></div>
      <span class="subtitle2">{{ subtitle2 }}</span>
    </div>
    <i v-if="selected" class="checkmark s24 filled"></i>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    subtitle2: String,
    selected: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.route-card {
  display: flex;
  align-items: center;
  padding: 10px 16px 10px 16px;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;

  border: 1px solid #4e4e4e;

  &.selected {
    border-color: transparent;
    background-color: #444;
  }
}

.route-details {
  flex-grow: 1;

  .title {
    color: rgba(#fff, 0.8);
    font-size: 20px;
    font-weight: 700;
  }

  .subtitle,
  .subtitle2 {
    color: rgba(#fff, 0.8);
    font-size: 14px;
  }

  .circle {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: rgba(#fff, 0.4);
    margin-left: 6px;
    margin-right: 6px;
  }
}
</style>
