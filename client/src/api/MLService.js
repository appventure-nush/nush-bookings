import client from './client';

export default {
  async autofillTitle(imageUrl) {
    const res = await client.post('predict?url=' + imageUrl);
    return res.data;
  },
};
