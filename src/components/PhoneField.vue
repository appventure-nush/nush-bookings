<template>
  <div class="phone-field">
    <span class="country-code">+65</span>
    <input
      type="tel"
      pattern="[0-9]{4} [0-9]{4}"
      :value="modelValue"
      @input="$emit('$update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
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

  .country-code {
    color: rgba(#fff, 0.6);
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
</style>
