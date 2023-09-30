<template>
  <div class="container py-5">
    <!-- NavTabs -->
    <NavTabs />

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
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";
import RestaurantCard from "@/components/RestaurantCard.vue";
import RestaurantsNavPills from "@/components/RestaurantsNavPills.vue";
import RestaurantsPagination from "@/components/RestaurantsPagination.vue";

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Brisa Paucek",
      tel: "522.770.6724",
      address: "51149 Otis Summit",
      opening_hours: "08:00",
      description: "Necessitatibus laboriosam molestias impedit minus ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=57.75440927021156",
      viewCounts: 1,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-02-03T21:01:59.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: true,
      isLiked: false,
    },
    {
      id: 2,
      name: "Germaine Miller",
      tel: "(028) 919-4481 x287",
      address: "744 Champlin Springs",
      opening_hours: "08:00",
      description: "Consequatur et sunt sed in omnis. Explicabo iusto ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=52.225139550843956",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 3,
      name: "Cassie Bogisich",
      tel: "983-273-5919",
      address: "348 Kertzmann Isle",
      opening_hours: "08:00",
      description: "Molestias voluptatem ex in laborum id.\nRepellendus",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=59.289936541769976",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 4,
      name: "Ericka VonRueden",
      tel: "1-394-048-6892",
      address: "24256 Miracle Fords",
      opening_hours: "08:00",
      description: "necessitatibus occaecati similique",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=9.647862429270383",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 5,
      name: "Coralie Maggio",
      tel: "840-955-7194 x714",
      address: "10922 Cole Island",
      opening_hours: "08:00",
      description: "Molestiae voluptas aut veniam eum et autem volupta",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=99.03874894941211",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 6,
      name: "Alaina Schumm",
      tel: "(850) 766-6794 x1819",
      address: "29619 Bashirian Bypass",
      opening_hours: "08:00",
      description: "Ipsam cum deserunt aut ratione reprehenderit hic d",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=92.566271072321",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 7,
      name: "Vicente Hand",
      tel: "1-909-527-5737",
      address: "6030 Mertz Turnpike",
      opening_hours: "08:00",
      description: "Quis sunt rerum iure. Sit rerum quia. Hic laborios",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=66.68370429610546",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 8,
      name: "Helene Sipes",
      tel: "(364) 509-8601 x551",
      address: "976 Clovis Point",
      opening_hours: "08:00",
      description: "Non odit velit asperiores.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=52.050491609497286",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 9,
      name: "Dock Goyette",
      tel: "058-093-2225",
      address: "388 Willy Locks",
      opening_hours: "08:00",
      description: "suscipit",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=50.02704392443646",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 10,
      name: "Alyson Padberg",
      tel: "1-706-068-4520 x2462",
      address: "0152 Fay Mews",
      opening_hours: "08:00",
      description: "aperiam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=41.01411544309157",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
  ],
  categories: [
    {
      id: 1,
      name: "中式料理",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
    {
      id: 2,
      name: "日本料理",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
    {
      id: 3,
      name: "義大利料理",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
    {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
    {
      id: 5,
      name: "素食料理",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
    {
      id: 6,
      name: "美式料理",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
    {
      id: 7,
      name: "複合式料理",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
  ],
  categoryId: "",
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2,
};

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
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
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next,
      } = dummyData;
      this.restaurants = restaurants;
      this.categories = categories;
      this.categoryId = categoryId;
      this.currentPage = page;
      this.totalPage = totalPage;
      this.previousPage = prev;
      this.nextPage = next;
    },
  },
};
</script>
