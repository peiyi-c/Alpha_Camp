import { apiHelper } from "@/utils/helpers.js";
const getToken = () => localStorage.getItem("token");

export default {
  categories: {
    get() {
      return apiHelper.get("/admin/categories", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    create(data) {
      return apiHelper.post(
        "admin/categories",
        { ...data },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    update({ categoryId, name }) {
      return apiHelper.put(
        `/admin/categories/${categoryId}`,
        { categoryId, name },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
    },
  },
  restaurants: {
    create({ formData }) {
      return apiHelper.post("/admin/restaurants", formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    get() {
      return apiHelper.get("/admin/restaurants", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
  },
  users: {
    get() {
      return apiHelper.get("/admin/users");
    },
    update({ userId, isAdmin }) {
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin });
    },
  },
};
