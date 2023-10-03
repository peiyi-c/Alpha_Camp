import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/views/SignIn.vue";
import Restaurants from "@/views/Restaurants.vue";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/restaurants",
  },
  {
    path: "/signin",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/restaurants",
    name: "restaurants",
    component: Restaurants,
    //props: (route) => ({ query: route.query.categoryId }),
  },
  {
    path: "/restaurants/feeds",
    name: "restaurants-feeds",
    component: () => import("@/views/RestaurantsFeeds.vue"),
  },
  {
    path: "/restaurants/top",
    name: "restaurants-tops",
    component: () => import("@/views/RestaurantsTop.vue"),
  },
  {
    path: "/restaurants/:id",
    name: "restaurant",
    component: () => import("@/views/Restaurant.vue"),
  },
  {
    path: "/restaurants/:id/dashboard",
    name: "restaurant-dashboard",
    component: () => import("@/views/RestaurantDashboard.vue"),
  },
  {
    path: "/admin",
    exact: true,
    redirect: "/admin/restaurants",
  },
  {
    path: "/admin/restaurants",
    name: "admin-restaurants",
    component: () => import("@/views/AdminRestaurants.vue"),
  },
  {
    path: "/admin/restaurants/new",
    name: "admin-restaurant-new",
    component: () => import("../views/AdminRestaurantNew.vue"),
  },
  {
    path: "/admin/restaurants/:id",
    name: "admin-restaurant",
    component: () => import("../views/AdminRestaurant.vue"),
  },
  {
    path: "/admin/restaurants/:id/edit",
    name: "admin-restaurant-edit",
    component: () => import("../views/AdminRestaurantEdit.vue"),
  },
  {
    path: "/users/top",
    name: "users-top",
    component: () => import("@/views/UsersTop.vue"),
  },
  {
    path: "/users/:id",
    name: "user",
    component: () => import("@/views/User.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  linkActiveClass: "active", // Bootstrap .active
  history: createWebHistory(),
  routes,
});

export default router;
