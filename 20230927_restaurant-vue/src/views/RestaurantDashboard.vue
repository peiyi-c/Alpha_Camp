<template>
  <Spinner v-if="isLoading" />
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.Category }}
      </span>
    </div>
    <hr />
    <ul>
      <li>Comments: {{ restaurant.commentsLength }}</li>
      <li>View counts: {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      Back
    </button>
  </div>
</template>

<script>
import restaurantsAPI from "@/apis/restaurants.js";
import { Toast } from "@/utils/helpers.js";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "RestaurantDashboard",
  components: {
    Spinner,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: 0,
        viewCounts: 0,
      },
      isLoading: true,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      this.isLoading = true;
      try {
        const { data } = await restaurantsAPI.getDashboard({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { id, name, Category, Comments, viewCounts } = data.restaurant;

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryName: Category.name || "none",
          commentsLength: Comments.length,
          viewCounts,
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "Can not get restaurant detail, please try it later",
        });
      }
    },
  },
};
</script>
