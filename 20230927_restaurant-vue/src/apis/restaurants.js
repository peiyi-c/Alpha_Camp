import { apiHelper } from "@/utils/helpers.js";
const getToken = () => localStorage.getItem("token");

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId });
    // axios.get(url, config)
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getFeeds() {
    return apiHelper.get("/restaurants/feeds", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getTopRestaurants() {
    return apiHelper.get("/restaurants/top", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
