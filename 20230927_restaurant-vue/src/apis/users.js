import { apiHelper } from "@/utils/helpers.js";
const getToken = () => localStorage.getItem("token");

export default {
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
};
