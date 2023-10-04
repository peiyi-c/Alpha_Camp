<script>
// bootstrap js and css
import "bootstrap"; //node_module/bootstrap/package.json -> "main": "dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.min.css";
// sweetalert2 css
import "sweetalert2/dist/sweetalert2.min.css";

import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<template>
  <div id="restaurant-forum">
    <Navbar />
    <main role="main" class="mt-5 bg-white">
      <router-view />
    </main>
  </div>
</template>

<style></style>
