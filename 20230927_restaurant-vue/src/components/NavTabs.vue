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
          title: "首頁",
          path: "/restaurants",
        },
        {
          id: crypto.randomUUID(),
          title: "最新動態",
          path: "/restaurants/feeds",
        },
        {
          id: crypto.randomUUID(),
          title: "TOP 10 人氣餐廳",
          path: "/restaurants/top",
        },
        {
          id: crypto.randomUUID(),
          title: "美食達人",
          path: "/users/top",
        },
      ],
    };
  },
};
</script>
