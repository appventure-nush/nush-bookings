import client from './client';

export default {
  async getUser() {
    try {
      const res = await client.get('auth/');
      return res.data;
    } catch (e) {
      return null;
    }
  },
  async signIn(username, password) {
    try {
      const res = await client.post('auth/sign-in/', { username, password });
      const { user, token } = res.data;
      console.log(user);
      console.log('TOKEN');
      console.log(token);
      localStorage.setItem('token', token);
      return user;
    } catch (e) {
      return null;
    }
  },
  async signUp(username, password) {
    const res = await client.post('auth/sign-up/', {
      username,
      password,
    });
    const { user, token } = res.data;
    console.log('TOKEN');
    console.log(token);
    localStorage.setItem('token', token);
    return user;
  },
  signOut() {
    localStorage.removeItem('token');
  },
  async getBearerInfo(id) {
    const res = await client.get('user/' + id);
    return res.data;
  },
  async updateUser(user) {
    await client.put('user/', user);
  },
};
