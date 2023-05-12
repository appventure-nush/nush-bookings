<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="{ error }"
  />
  <span v-if="error" class="error-msg">{{ error }}</span>
</template>

<script>
export default {
  props: {
    modelValue: String,
    error: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  height: 54px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #333;
  border-radius: 10px;
  display: flex;
  align-items: center;
  border-width: 1px;

  outline: none;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 700;

  &.error {
    border: 1px solid #d42727;
  }
}

.error-msg {
  color: #d42727;
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  margin-left: 12px;
}
</style>
