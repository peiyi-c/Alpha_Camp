<template>
  <ul class="nav nav-tabs mb-4">
    <li v-for="tab in tabs" :key="tab.id" class="nav-item">
      <router-link :to="tab.path" class="nav-link">
        {{ tab.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          id: crypto.randomUUID(),
          title: "Home",
          path: "/restaurants",
        },
        {
          id: crypto.randomUUID(),
          title: "Newest Feeds",
          path: "/restaurants/feeds",
        },
        {
          id: crypto.randomUUID(),
          title: "TOP 10 Popular Restaurants",
          path: "/restaurants/top",
        },
        {
          id: crypto.randomUUID(),
          title: "Culinary Delights Pros",
          path: "/users/top",
        },
      ],
    };
  },
};
</script>
