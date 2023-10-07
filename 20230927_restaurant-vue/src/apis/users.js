import { apiHelper } from "@/utils/helpers.js";

export default {
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`);
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData);
  },
  getCurrentUser() {
    return apiHelper.get("/get_current_user");
  },
  addFavorite({ restaurantId }) {
    // axios.post(url, data, config)
    return apiHelper.post(`/favorite/${restaurantId}`, null);
  },
  deleteFavorite({ restaurantId }) {
    // axios.delete(url, config)
    return apiHelper.delete(`/favorite/${restaurantId}`);
  },
  addLike({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null);
  },
  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`);
  },
  getTopUser() {
    return apiHelper.get("/users/top");
  },

  addFollowing({ userId }) {
    return apiHelper.post(`/following/${userId}`, null);
  },
  deleteFollowing({ userId }) {
    return apiHelper.delete(`/following/${userId}`);
  },
};
