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
          title: "Feeds",
          path: "/restaurants/feeds",
        },
        {
          id: crypto.randomUUID(),
          title: "TOP 10 ",
          path: "/restaurants/top",
        },
        {
          id: crypto.randomUUID(),
          title: "Culinary Pros",
          path: "/users/top",
        },
      ],
    };
  },
};
</script>

<style scoped>
.nav-tabs {
  border-bottom: 1px solid #bd2333;
}

.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover,
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  border-color: #bd2333;
  background-color: #bd2333;
  color: white;
}
</style>
