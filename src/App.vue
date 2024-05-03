<template>
  <router-view />
</template>

<script></script>

<style lang="scss">
@import './assets/icons/style.css';

@font-face {
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/AvenirLTStd-Roman.otf') format('opentype');
}
@font-face {
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 500;
  src: url('./assets/fonts/AvenirLTStd-Medium.otf') format('opentype');
}

@font-face {
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 700;
  src: url('./assets/fonts/AvenirLTStd-Heavy.otf') format('opentype');
}

:root {
  --normal-text-size: 16px;
  --smaller-text-size: 14px;
  --bigger-text-size: 20px;
}

// [data-fontsize="large"] {
//   --normal-text-size: 24px
//   --smaller-text-size: 18px
//   --bigger-text-size: 28px
// }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Avenir';
  /* line-height: 1.2; */
  -webkit-tap-highlight-color: transparent;
}

.spacer {
  flex-grow: 1;
}

.column-scroll {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

// to fix fullscreen issue on mobile

html,
body,
#app {
  height: 100%;
}

// for dialog transition

.v-enter-active,
.v-leave-active {
  transition: opacity 400ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
