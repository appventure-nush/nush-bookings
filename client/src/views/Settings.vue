<template>
  <div class="settings-container">
    <text-field label="Profile picture" v-model="user.profilePic" />
    <text-field label="Username" v-model="user.username" />
    <text-field label="Phone number" v-model="user.phoneNumber" />
    <multi-line-field label="Biography" v-model="user.bio" />
    <div class="buttons">
      <button @click="updateSettings">Update settings</button>
      <button @click="signOut">Sign out</button>
    </div>
  </div>
</template>

<script>
import AuthService from '../api/AuthService';
import userStore from '../store/user';
import dialogStore from '../store/dialog';
import TextField from '../components/TextField.vue';
import MultiLineField from '../components/MultiLineField.vue';

export default {
  components: { TextField, MultiLineField },
  name: 'Settings',
  data() {
    return userStore;
  },
  methods: {
    signOut() {
      AuthService.signOut();
      userStore.user = null;
      this.$router.push('/');
    },
    async updateSettings() {
      await AuthService.updateUser(this.user);
      dialogStore.type = 'success';
      dialogStore.title = 'Account updated';
      dialogStore.description =
        'Success! Your account details have been updated.';
      dialogStore.shown = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-container {
  padding: 60px 100px 60px 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.buttons {
  margin-top: 20px;
}
button {
  margin-right: 20px;
}
</style>
