<template>
  <div class="container py-5">
    <!-- NavTabs -->
    <NavTabs />

    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- RestaurantsNavPills -->
      <RestaurantsNavPills :categories="categories" />

      <div class="row">
        <!--  RestaurantCard-->
        <RestaurantCard
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :initial-restaurant="restaurant"
        />
      </div>
      <!-- RestaurantPagination -->
      <RestaurantsPagination
        v-if="totalPage.length > 1"
        :current-page="currentPage"
        :total-page="totalPage"
        :category-id="categoryId"
        :previous-page="previousPage"
        :next-page="nextPage"
      />
      <div v-if="restaurants.length < 1" class="text-center pt-3">
        <h1>No restaurant yet..</h1>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";
import RestaurantCard from "@/components/RestaurantCard.vue";
import RestaurantsNavPills from "@/components/RestaurantsNavPills.vue";
import RestaurantsPagination from "@/components/RestaurantsPagination.vue";
import restaurantsAPI from "@/apis/restaurants.js";
import { Toast } from "@/utils/helpers.js";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "Restaurants",
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
      isLoading: true,
    };
  },
  created() {
    const { page = "", categoryId = "" } = this.$route.query; // 取得動態路由資訊
    this.fetchRestaurants({
      queryPage: page,
      queryCategoryId: categoryId,
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 在網址產生變化時，重新向後端發送 request
    const { page = "", categoryId = "" } = to.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
    next();
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      this.isLoading = true;
      try {
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId,
        });

        const { data } = response;
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = data;
        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: `Can not get restaurant data, pleeese try it later.`,
        });
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 22px;
}
</style>
