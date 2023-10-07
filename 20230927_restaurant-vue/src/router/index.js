import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/views/SignIn.vue";
import Restaurants from "@/views/Restaurants.vue";
import store from "@/store/index.js";

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser;
  if (currentUser && !currentUser.isAdmin) {
    next("/404");
    return;
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/signin",
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
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/restaurants/new",
    name: "admin-restaurant-new",
    component: () => import("@/views/AdminRestaurantNew.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/restaurants/:id",
    name: "admin-restaurant",
    component: () => import("@/views/AdminRestaurant.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/restaurants/:id/edit",
    name: "admin-restaurant-edit",
    component: () => import("@/views/AdminRestaurantEdit.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/categories",
    name: "admin-categories",
    component: () => import("@/views/AdminCategories.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import("../views/AdminUsers.vue"),
    beforeEnter: authorizeIsAdmin,
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
    path: "/users/:id/edit",
    name: "user-edit",
    component: () => import("@/views/UserEdit.vue"),
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

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem("token");
  const tokenInStore = store.state.token;
  let isAuthenticated = store.state.isAuthenticated;

  // compare token in localStorage and token in store
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch("fetchCurrentUser");
  }

  // signin and signup page do not need token verification
  const pathsWithoutAuthentication = ["sign-up", "sign-in"];

  // if login failed, redirect to signin
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next("/signin");
    return;
  }
  // if login successful, redirect to restaurants
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next("/restaurants");
    return;
  }

  next();
});
export default router;
