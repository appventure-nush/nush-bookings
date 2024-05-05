import { reactive } from 'vue';

export const bigFontSize = reactive({
  value: false,
  toggle() {
    this.value = !this.value;
  },
});
