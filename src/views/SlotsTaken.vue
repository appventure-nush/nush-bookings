<template>
  <div class="slots-taken">
    <i class="emoji_sad s20 regular"></i>
    <p>Unfortunately, slots for that timing have already been taken.</p>
    <p>
      This might be due to someone having just booked the last slot, or because
      you chose to book for more slots than there are available slots (e.g. you
      booked for 4 pax, but there are only 2 slots left)
    </p>
    <MyButton
      text="Try again"
      :onClick="() => $router.push('/select-timing')"
    />
  </div>
</template>

<script>
import MyButton from '../components/MyButton.vue';

export default {
  components: { MyButton },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.slots-taken {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #1c1c1c;
  padding: 70px;
  height: 100%;

  i {
    transform: scale(8);
    margin-bottom: 80px;
  }

  p {
    margin-bottom: 40px;
    font-size: var(--normal-text-size);
    font-weight: 500;
    text-align: center;
  }
}
</style>
