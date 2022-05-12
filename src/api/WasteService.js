import client from './client';

export default {
  async getWaste(id) {
    const res = await client.get('waste/' + id);
    console.log(res.data);
    return res.data;
  },
  async addWaste(imageUrl, title, description, category) {
    const res = await client.post('waste', {
      imageUrl,
      title,
      description,
      category,
    });
    return res.data;
  },
  async updateWaste(waste) {
    await client.put('waste/' + waste._id, waste);
  },
  async toggleFav(wasteId) {
    await client.post('waste/toggle-favorite/' + wasteId);
  },
  async recent(ascending) {
    const res = await client.get(
      `waste/recent/?ascending=${ascending}`,
      {},
      {
        params: {
          ascending,
        },
      }
    );
    console.log(res.data);
    return res.data;
  },
  async category(category) {
    const res = await client.get(
      `waste/filter/?category=${category}`,
      {},
      {
        params: {
          category: String,
        },
      }
    );
    console.log(res.data);
    return res.data;
  },
  async search(title) {
    const res = await client.get(
      `waste/search/?title=${title}`,
      {},
      {
        params: {
          title: String,
        },
      }
    );
    console.log(res.data);
    return res.data;
  },
};
