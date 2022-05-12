<template>
  <div class="login-container">
    <div class="title">
      <h1>One man's trash</h1>
      <h2>is another man's treasure</h2>
    </div>
    <div class="panel">
      <h1>Login</h1>
      <h2>Sign in to your account</h2>
      <text-field
        class="username-field"
        label="Username"
        :dark="true"
        v-model="username"
      />
      <text-field
        class="password-field"
        label="Password"
        kind="password"
        :dark="true"
        v-model="password"
      />
      <div class="buttons">
        <button @click="signIn">Sign in</button>
        <button class="secondary" @click="signUp">Sign up</button>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from '../components/TextField.vue';
import AuthService from '../api/AuthService';
import userStore from '../store/user';
import dialogStore from '../store/dialog';

export default {
  components: { TextField },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async signIn() {
      const user = await AuthService.signIn(this.username, this.password);
      if (user) {
        userStore.user = user;
        this.$router.push('/app/home');
      } else {
        dialogStore.type = 'error';
        dialogStore.title = 'Failed to sign in';
        dialogStore.description =
          'Your username or password may be incorrect, please check it again.';
        dialogStore.shown = true;
      }
    },
    async signUp() {
      const user = await AuthService.signUp(this.username, this.password);
      if (user) {
        userStore.user = user;
        this.$router.push('/app/home');
      }
    },
  },
};
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  background-image: url('~@/assets/img/greenery.png');
  background-size: cover;
  color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 140px;
  padding-right: 140px;
}

.title {
  h1 {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 20px;
  }

  h2 {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.6;
  }
}

.panel {
  background-color: rgba(#000, 0.4);
  padding: 44px 50px 44px 50px;
  border-radius: 20px;

  h1 {
    color: var(--accent);
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 50px;
  }

  .username-field {
    margin-bottom: 30px;
  }

  .password-field {
    margin-bottom: 50px;
  }

  .buttons {
    display: flex;
    gap: 14px;
  }
}
</style>
