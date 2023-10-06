import { apiHelper } from "@/utils/helpers.js";
const getToken = () => localStorage.getItem("token");

export default {
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getCurrentUser() {
    return apiHelper.get("/get_current_user", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  addFavorite({ restaurantId }) {
    // axios.post(url, data, config)
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  deleteFavorite({ restaurantId }) {
    // axios.delete(url, config)
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  addLike({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getTopUser() {
    return apiHelper.get("/users/top", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  addFollowing({ userId }) {
    return apiHelper.post(`/following/${userId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  deleteFollowing({ userId }) {
    return apiHelper.delete(`/following/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
