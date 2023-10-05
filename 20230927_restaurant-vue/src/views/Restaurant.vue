<template>
  <div class="container py-5">
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
  </div>
</template>

<script>
import RestaurantDetail from "@/components/RestaurantDetail.vue";
import RestaurantComments from "@/components/RestaurantComments.vue";
import CreateComment from "@/components/CreateComment.vue";
import restaurantsAPI from "@/apis/restaurants.js";
import { Toast } from "@/utils/helpers.js";

const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

export default {
  name: "Restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
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
      currentUser: dummyUser.currentUser,
    };
  },
  created() {
    // 用this.$route.params取得動態路由的值
    const id = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
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
          categoryName: Category.name || "uncategorized",
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
      } catch (error) {
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
