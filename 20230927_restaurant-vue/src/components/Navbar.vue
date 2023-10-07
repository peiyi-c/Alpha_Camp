<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/"> Restaurant Reviews </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link
          v-if="currentUser.isAdmin"
          to="/admin"
          class="text-white mr-3"
        >
          Admin Section
        </router-link>
        <template v-if="isAuthenticated">
          <!-- is user is login -->
          <router-link
            :to="{ name: 'user', params: { id: currentUser.id } }"
            class="text-white mr-3"
          >
            Hi, {{ currentUser.name || "User" }}
          </router-link>
          <button
            @click="logout"
            type="button"
            class="btn btn-sm btn-outline-alert my-1 my-sm-0"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style scoped>
.navbar-toggler {
  min-width: 70px;
  margin-right: 0;
}

nav.bg-dark {
  padding: 14px 16px;
  background-color: #bd2333 !important;
}

.navbar-brand {
  font-size: 19px;
  padding: 0;
}
</style>
