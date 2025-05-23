<template>
  <div class="phone-field" :class="{ error }">
    <span class="country-code">+65</span>
    <input
      type="tel"
      pattern="[0-9]{4} [0-9]{4}"
      :value="modelValue.slice(3)"
      @input="$emit('update:modelValue', '+65' + $event.target.value)"
    />
  </div>
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
.phone-field {
  height: 54px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #333;
  border-radius: 10px;
  display: flex;
  align-items: center;
  border-width: 1px;

  &.error {
    border: 1px solid #d42727;
  }

  .country-code {
    color: rgba(#fff, 0.9);
    font-size: 20px;
    font-weight: 700;
    margin-right: 10px;
  }

  input {
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: 700;
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
