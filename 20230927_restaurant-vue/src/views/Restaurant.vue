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

const dummyData = {
  restaurant: {
    id: 1,
    name: "Brisa Paucek",
    tel: "522.770.6724",
    address: "51149 Otis Summit",
    opening_hours: "08:00",
    description:
      "Necessitatibus laboriosam molestias impedit minus eum voluptatum. Quia et quia quidem cum. Quo molestias sed ex aperiam voluptatibus. Corporis animi asperiores tempora perspiciatis qui et tempora incidunt qui. Sed consequatur similique qui quia totam alias.\n \rDolorum harum cum. Est quibusdam sunt harum tempore tenetur voluptatem. Aut non cum.\n \rAut illo repudiandae corporis sed et eum iste. Nisi ut impedit et animi atque quas. Quo amet rerum. Amet tenetur numquam voluptatem id adipisci.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=57.75440927021156",
    viewCounts: 2,
    createdAt: "2022-01-29T09:35:37.000Z",
    updatedAt: "2023-09-29T09:15:54.083Z",
    CategoryId: 1,
    Category: {
      id: 1,
      name: "中式料理",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
    FavoritedUsers: [
      {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$uiOzMVMpsMUy./phdefdsOw4qNXXSHwDoMrqXWdA7pmyEszMCP9eC",
        isAdmin: true,
        image: null,
        createdAt: "2022-01-29T09:35:36.000Z",
        updatedAt: "2022-01-29T09:35:36.000Z",
        Favorite: {
          UserId: 1,
          RestaurantId: 1,
          createdAt: "2022-06-19T16:05:05.000Z",
          updatedAt: "2022-06-19T16:05:05.000Z",
        },
      },
    ],
    LikedUsers: [],
    Comments: [
      {
        id: 1,
        text: "Reiciendis praesentium ut modi tenetur voluptates reprehenderit.",
        UserId: 3,
        RestaurantId: 1,
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
        User: {
          id: 3,
          name: "user2",
          email: "user2@example.com",
          password:
            "$2a$10$oc68qwsjVY0rOaoQxQTrQ.OQ5JQf99OdTQX1v97/yVnzJ/FtKUDQW",
          isAdmin: false,
          image: null,
          createdAt: "2022-01-29T09:35:37.000Z",
          updatedAt: "2022-01-29T09:35:37.000Z",
        },
      },
      {
        id: 51,
        text: "Hic dolorem reiciendis impedit eos voluptas doloremque et possimus.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$RmEfHQwEkA3bc0yaburj2.MmSQyM.e1is8vGc5Y5b4CXhIsHRLgXu",
          isAdmin: false,
          image: null,
          createdAt: "2022-01-29T09:35:37.000Z",
          updatedAt: "2022-01-29T09:35:37.000Z",
        },
      },
      {
        id: 101,
        text: "Eaque id quas architecto beatae.",
        UserId: 3,
        RestaurantId: 1,
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
        User: {
          id: 3,
          name: "user2",
          email: "user2@example.com",
          password:
            "$2a$10$oc68qwsjVY0rOaoQxQTrQ.OQ5JQf99OdTQX1v97/yVnzJ/FtKUDQW",
          isAdmin: false,
          image: null,
          createdAt: "2022-01-29T09:35:37.000Z",
          updatedAt: "2022-01-29T09:35:37.000Z",
        },
      },
    ],
  },
  isFavorited: true,
  isLiked: false,
};

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
    fetchRestaurant(restaurantId) {
      //console.log("fetchRestaurant id:", restaurantId);
      const { restaurant, isFavorited, isLiked } = dummyData;
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
        categoryName: Category.name || "未分類",
        image,
        openingHours,
        tel,
        address,
        description,
        isFavorited,
        isLiked,
      };
      this.restaurantComments = Comments;
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
