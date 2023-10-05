<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>
<script>
import AdminRestaurantForm from "@/components/AdminRestaurantForm.vue";
import adminAPI from "@/apis/admin.js";
import { Toast } from "@/utils/helpers.js";

export default {
  name: "AdminRestaurantEdit",
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      isProcessing: false,
    };
  },
  beforeRouteUpdate(to, from, now) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    now();
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },

  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId });
        const { restaurant } = data;
        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId,
        } = restaurant;
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not get restaurant data, please try it later",
        });
      }
    },
    async handleAfterSubmit(formData) {
      try {
        // for (const [key, value] of formData.entries()) {
        //   console.log(key + ": " + value);
        // }
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can not update restaurant, please try it later",
        });
      }
    },
  },
};
</script>
