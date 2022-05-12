<template>
  <div class="text-field-container" :class="{ dark: dark }">
    <span v-if="label">{{ label }}</span>
    <div class="wrapper">
      <input :type="kind" v-model="text" :placeholder="placeholder" />
      <i v-if="icon" :class="icon" @click.stop="$emit('clickIcon')"></i>
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
    placeholder: {
      type: String,
      default: '',
    },
    icon: String,
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
.text-field-container {
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

    position: relative; // for icon

    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      color: black;
      cursor: pointer;

      &:active {
        color: var(--accent);
      }
    }
  }

  input {
    background-color: #f8f8f8;
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    padding-left: 16px;
    padding-right: 16px;

    font-size: 16px;
    font-weight: 700;

    &:focus {
      padding-top: 3px;
      border-bottom: 3px solid var(--accent);
    }

    &::placeholder {
      color: rgba(#000, 0.14);
    }
  }

  &.dark {
    color: white;

    input {
      color: white;
      background-color: #111;

      &::placeholder {
        color: rgba(#fff, 0.14);
      }
    }
  }
}
</style>
