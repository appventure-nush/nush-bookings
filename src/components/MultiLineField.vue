<template>
  <div class="multi-line-field-container" :class="{ dark: dark }">
    <span>{{ label }}</span>
    <div class="wrapper">
      <textarea :type="kind" v-model="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    label: String,
    modelValue: String,
    kind: {
      type: String,
      default: 'text',
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    text: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
  },
};
</script>

<style lang="scss">
.multi-line-field-container {
  display: flex;
  flex-direction: column;
  color: black;

  span {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .wrapper {
    border-radius: 8px;
    overflow: hidden;
  }

  textarea {
    background-color: #f8f8f8;
    width: 100%;
    height: 160px;
    border: none;
    outline: none;
    padding-left: 16px;
    padding-top: 10px;
    padding-right: 16px;
    padding-bottom: 10px;
    resize: none;

    font-size: 16px;
    font-weight: 700;

    &:focus {
      padding-bottom: 13px;
      border-bottom: 3px solid var(--accent);
    }
  }

  &.dark {
    color: white;

    input {
      color: white;
      background-color: #111;
    }
  }
}
</style>
