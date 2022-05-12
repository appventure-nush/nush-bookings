import { reactive } from 'vue';

export default reactive({
  shown: false,
  type: '', // success or error or info
  title: '',
  description: '',
});
