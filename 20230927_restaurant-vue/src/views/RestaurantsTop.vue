<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <div class="card mb-3" style="max-width: 540px; margin: auto">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="row no-gutters"
      >
        <div class="col-md-4">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            <img class="card-img" :src="restaurant.image" />
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <span class="badge badge-secondary"
              >收藏數：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <a href="#" class="btn btn-primary mr-2">Show</a>

            <button
              v-if="restaurant.isFavorited"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
              type="button"
              class="btn btn-danger mr-2"
            >
              移除最愛
            </button>
            <button
              v-else
              @click.stop.prevent="addFavorite(restaurant.id)"
              type="button"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavTabs from "@/components/NavTabs.vue";
const dummyData = {
  restaurants: [
    {
      id: 49,
      name: "Andrew Wilkinson",
      tel: "1-079-333-8813",
      address: "288 Lulu Way",
      opening_hours: "08:00",
      description: "Numquam est ex cum. Eaque harum est iure. Quos con",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.06247042719298",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
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
            RestaurantId: 49,
            createdAt: "2022-06-19T16:57:49.000Z",
            updatedAt: "2022-06-19T16:57:49.000Z",
          },
        },
      ],
      isFavorited: true,
      FavoriteCount: 1,
    },
    {
      id: 48,
      name: "Hank Halvorson",
      tel: "452.041.5018 x279",
      address: "567 Daisy Manors",
      opening_hours: "08:00",
      description: "at",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=17.210185699313918",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
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
            RestaurantId: 48,
            createdAt: "2022-06-19T16:56:54.000Z",
            updatedAt: "2022-06-19T16:56:54.000Z",
          },
        },
      ],
      isFavorited: true,
      FavoriteCount: 1,
    },
    {
      id: 1,
      name: "Brisa Paucek",
      tel: "522.770.6724",
      address: "51149 Otis Summit",
      opening_hours: "08:00",
      description: "Necessitatibus laboriosam molestias impedit minus ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=57.75440927021156",
      viewCounts: 2,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2023-09-29T09:15:54.000Z",
      CategoryId: 1,
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
      isFavorited: true,
      FavoriteCount: 1,
    },
    {
      id: 50,
      name: "Johnson Batz",
      tel: "(453) 557-7492",
      address: "2637 Candelario Gateway",
      opening_hours: "08:00",
      description: "assumenda saepe nesciunt",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=69.4863452792938",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 47,
      name: "Chelsey Durgan",
      tel: "1-601-099-2576 x3025",
      address: "25902 Kutch Tunnel",
      opening_hours: "08:00",
      description: "non doloribus et",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=9.087908104129848",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 46,
      name: "Maxie Grimes",
      tel: "630.131.8514 x10613",
      address: "24110 Kelly Lake",
      opening_hours: "08:00",
      description: "Nobis a facere ut dolor ut dolorum alias excepturi",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=96.85868449955895",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 45,
      name: "Lonnie Ward",
      tel: "066-003-8043 x37157",
      address: "5541 Prohaska Courts",
      opening_hours: "08:00",
      description: "Sequi voluptas qui et id id doloremque quia sunt s",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=47.387348526880224",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 44,
      name: "Devon McCullough",
      tel: "(492) 026-8418 x3289",
      address: "2738 Padberg Mountain",
      opening_hours: "08:00",
      description: "autem",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=92.76610709546867",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 43,
      name: "Kathleen Daugherty",
      tel: "929-650-6243 x2508",
      address: "4789 Balistreri Street",
      opening_hours: "08:00",
      description: "laboriosam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=61.366893030729976",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 42,
      name: "Zion Mann I",
      tel: "(159) 616-2489 x06902",
      address: "7853 Kuhlman Greens",
      opening_hours: "08:00",
      description: "numquam ratione enim",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=23.209683102844703",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
  ],
};
export default {
  components: {
    NavTabs,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurantTops();
  },
  methods: {
    fetchRestaurantTops() {
      this.restaurants = dummyData.restaurants;
    },
    addFavorite(id) {
      this.restaurants = this.restaurants.map((restaurant) => {
        if (restaurant.id === id) {
          return {
            ...restaurant,
            FavoriteCount: restaurant.FavoriteCount + 1,
            isFavorited: true,
          };
        }
        return restaurant;
      });
    },
    deleteFavorite(id) {
      this.restaurants = this.restaurants.map((restaurant) => {
        if (restaurant.id === id) {
          return {
            ...restaurant,
            FavoriteCount: restaurant.FavoriteCount - 1,
            isFavorited: false,
          };
        }
        return restaurant;
      });
    },
  },
};
</script>
