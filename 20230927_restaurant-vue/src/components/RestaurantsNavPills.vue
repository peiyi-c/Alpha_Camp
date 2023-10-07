<template>
  <ul class="nav nav-pills mb-4">
    <li class="nav-item">
      <router-link
        class="nav-link"
        :class="{
          'nav-link-active': this.$route.query.categoryId === undefined,
        }"
        to="/restaurants"
      >
        All
      </router-link>
    </li>
    <li v-for="category in categories" :key="category.id" class="nav-item">
      <router-link
        class="nav-link"
        :class="{
          'nav-link-active':
            category.id === Number(this.$route.query.categoryId),
        }"
        :to="{ name: 'restaurants', query: { categoryId: category.id } }"
      >
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.nav-pills {
  display: flex;
  align-items: center;
  margin-bottom: 1rem !important;
}

.nav-pills .nav-link {
  margin-right: 7px;
  margin-bottom: 7px;
  padding: 5px 8px;
  border: 2px solid #a1a1a1;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  border-color: #bd2333;
  background-color: transparent;
  color: #bd2333;
}

.nav-pills .nav-link.active:hover {
  background-color: #bd2333;
  color: #ffffff;
}

.nav-pills .nav-item .nav-link-active {
  color: #ffffff;
  background-color: #bd2333;
}
</style>
