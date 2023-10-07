<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1>Restaurant Detail</h1>
      <!-- RestaurantDetail -->
      <RestaurantDetail :initial-restaurant="restaurant" />
      <hr />

      <!-- RestaurantComments -->
      <RestaurantComments
        :restaurant-comments="restaurantComments"
        @after-delete-comment="afterDeleteComment"
      />

      <!-- CreateComment -->
      <CreateComment
        :restaurant-id="restaurant.id"
        @after-create-comment="afterCreateComment"
      />
    </template>
  </div>
</template>

<script>
import RestaurantDetail from "@/components/RestaurantDetail.vue";
import RestaurantComments from "@/components/RestaurantComments.vue";
import CreateComment from "@/components/CreateComment.vue";
import restaurantsAPI from "@/apis/restaurants.js";
import { Toast } from "@/utils/helpers.js";
import Spinner from "@/components/Spinner.vue";

import { mapState } from "vuex";

export default {
  name: "Restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
    Spinner,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
    console.log(`${this.$route.params}`);
  },

  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const { data } = await restaurantsAPI.get({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        const { restaurant, isFavorited, isLiked } = data;
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments,
        } = restaurant;
        this.restaurant = {
          id,
          name,
          categoryName: Category.name || "none",
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "Can not get restaurant data, please try it later",
        });
      }
    },
    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    afterCreateComment({ commentId, restaurantId, text }) {
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        text,
        createdAt: new Date(),
      });
    },
  },
};
</script>
