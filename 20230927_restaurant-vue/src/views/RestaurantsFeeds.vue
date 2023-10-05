<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />

    <h1 class="mt-5">News Feed</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>Newest Restaurants</h3>
        <!-- NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <!-- NewestComments-->
        <h3>Newest Comments</h3>
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";
import NewestRestaurants from "@/components/NewestRestaurants.vue";
import NewestComments from "@/components/NewestComments.vue";
import restaurantsAPI from "@/apis/restaurants.js";
import { Toast } from "@/utils/helpers.js";

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        const response = await restaurantsAPI.getFeeds();
        const { data } = response;
        const { restaurants, comments } = data;
        this.restaurants = restaurants;
        this.comments = comments;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not get feeds, please try later.",
        });
      }
    },
  },
};
</script>
