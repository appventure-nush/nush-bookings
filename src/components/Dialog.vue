<template>
  <div class="wrapper">
    <div v-if="shown" class="bg">
      <div class="dialog-container">
        <div :class="'top ' + type">
          <div class="circle">
            <i :class="iconName + ' s16 regular'"></i>
          </div>
          <h2>{{ title }}</h2>
        </div>
        <p>{{ description }}</p>
        <button @click="shown = false">Ok</button>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import dialogStore from '../store/dialog';

export default {
  data() {
    return dialogStore;
  },
  computed: {
    iconName() {
      if (this.type === 'success') return 'checkmark';
      if (this.type === 'error') return 'dismiss';
      if (this.type === 'info') return 'question';
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background-color: rgba(#000, 0.4);
  display: grid;
  place-items: center;
}

.dialog-container {
  width: 400px;
  padding: 30px 34px 30px 34px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  .circle {
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 20px;
    display: grid;
    place-items: center;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
  }

  &.error {
    .circle {
      background-color: #cb3c3c;
    }

    h2 {
      color: #cb3c3c;
    }
  }

  &.success {
    .circle {
      background-color: #3d922f;
    }
    h2 {
      color: #3d922f;
    }
  }
  &.info {
    .circle {
      background-color: #426cbd;
    }
    h2 {
      color: #426cbd;
    }
  }
}

p {
  font-size: 18px;
  margin-bottom: 30px;
}

button {
  height: 34px;
  padding-left: 36px;
  padding-right: 36px;
  align-self: flex-end;
  color: black;
  background-color: rgba(#000, 0.04);

  &:active {
    background-color: rgba(#000, 0.08);
  }
}
</style>
