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
  getRestaurantsFeeds() {
    return apiHelper.get("/restaurants/feeds", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
