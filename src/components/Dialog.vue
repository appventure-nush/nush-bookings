<template>
  <div class="dialog">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <div v-if="isYesNo" class="options">
      <div class="btn" @click="$emit('yes')">Yes</div>
      <div class="btn highlight" @click="$emit('no')">No</div>
    </div>
    <div
      v-else
      class="btn"
      style="align-self: flex-end"
      @click="$emit('close')"
    >
      Close
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    isYesNo: Boolean, // fast solution since it wont be used for anything else
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
  width: 90%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 14px 30px rgba(#000, 0.15);
  padding: 24px 24px 16px 24px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: var(--bigger-text-size);
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    font-size: var(--normal-text-size);
    font-weight: 500;
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
    font-size: var(--normal-text-size);
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
