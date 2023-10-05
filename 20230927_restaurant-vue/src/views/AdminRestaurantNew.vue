<template>
  <div class="container py-5">
    <!-- AdminRestaurantForm -->
    <AdminRestaurantForm
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
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      isProcessing: false,
    };
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        // send formData to server via API
        //  for (const [key, value] of formData.entries()) {
        //     console.log(key + ": " + value);
        //   }
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.create({ formData });

        // if failed, show error
        if (data.status === "error") {
          throw new Error(data.message);
        }
        // if successful, redirect to admin/restaurants
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can not create restaurant, please try it later",
        });
      }
    },
  },
};
</script>
