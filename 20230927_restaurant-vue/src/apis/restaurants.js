import { apiHelper } from "@/utils/helpers.js";

export default {
  get({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`);
  },
  getDashboard({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}/dashboard`);
  },
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId });
    // axios.get(url, config)
    return apiHelper.get(`/restaurants?${searchParams.toString()}`);
  },
  getFeeds() {
    return apiHelper.get("/restaurants/feeds");
  },
  getTopRestaurants() {
    return apiHelper.get("/restaurants/top");
  },
};
