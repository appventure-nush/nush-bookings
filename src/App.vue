<template>
  <Dialog>
    <router-view />
  </Dialog>
</template>

<script>
import Dialog from './components/Dialog.vue';

export default {
  components: { Dialog },
};
</script>

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

@font-face {
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 300;
  src: url('./assets/fonts/AvenirLTStd-Light.otf') format('opentype');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Avenir';
  /* line-height: 1.2; */
}

$accent: #426cbd;

:root {
  --primary: #222;
  --accent: #426cbd;
}

.page {
  height: 100vh;
}

ul {
  list-style-type: none;
}

button,
svg[data-carbon-icon] {
  cursor: pointer;
}

a {
  text-decoration: none;
}

.spacer {
  flex-grow: 1;
}

h1 {
  font-size: 36px;
  font-weight: 700;
}

h2 {
  font-size: 24px;
  font-weight: 700;
}

h3 {
  font-size: 18px;
  font-weight: 700;
}

button {
  height: 40px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 10px;
  background-color: var(--accent);
  color: white;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 700;

  &:active {
    background-color: darken(#426cbd, 6%);
  }

  &.secondary {
    background-color: rgba(#426cbd, 0.1);
    color: var(--accent);

    &:active {
      background-color: rgba(#426cbd, 0.2);
    }
  }
}

/* components */

.toolbar-panel-container {
  background-color: var(--primary);
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding: 18px 20px 18px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.1);
}

.outline-input-light {
  height: 40px;
  background-color: transparent;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.outline-input-light:focus {
  border-color: rgba(0, 0, 0, 0.2);
}

.outline-input-dark {
  height: 40px;
  color: white;
  background-color: transparent;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.outline-input-dark:focus {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
