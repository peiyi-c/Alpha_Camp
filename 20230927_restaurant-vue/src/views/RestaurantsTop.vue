<template>
  <div class="container py-5">
    <!--  NavTabs -->
    <NavTabs />
    <h1 class="mt-5">Popular Restaurants</h1>

    <hr />
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="card mb-3"
      style="max-width: 80%; margin: auto"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            <img class="card-img" :src="emptyImage(restaurant.image)" />
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <span class="badge badge-secondary"
              >Saved count：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>

            <router-link
              :to="{ name: 'restaurant', params: { id: restaurant.id } }"
              class="btn btn-primary mr-2"
            >
              Show
            </router-link>

            <button
              v-if="restaurant.isFavorited"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
              type="button"
              class="btn btn-danger mr-2"
            >
              Remove from Favorite
            </button>
            <button
              v-else
              @click.stop.prevent="addFavorite(restaurant.id)"
              type="button"
              class="btn btn-primary"
            >
              Add to Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavTabs from "@/components/NavTabs.vue";
import { emptyImageFilter } from "@/utils/mixins.js";
import restaurantsAPI from "@/apis/restaurants.js";
import usersAPI from "@/apis/users.js";
import { Toast } from "@/utils/helpers.js";

export default {
  components: {
    NavTabs,
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurantTops();
  },
  methods: {
    async fetchRestaurantTops() {
      try {
        const { data } = await restaurantsAPI.getTopRestaurants();
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.restaurants = data.restaurants;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not get top restaurants data, please try later.",
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurants = this.restaurants.map((restaurant) => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              FavoriteCount: restaurant.FavoriteCount + 1,
              isFavorited: true,
            };
          }
          return restaurant;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not add to Favorite, please try it later.",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.restaurants = this.restaurants.map((restaurant) => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              FavoriteCount: restaurant.FavoriteCount - 1,
              isFavorited: false,
            };
          }
          return restaurant;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not remove from Favorite, please try it later.",
        });
      }
    },
  },
};
</script>
