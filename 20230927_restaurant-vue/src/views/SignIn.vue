<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        Submit
      </button>

      <p class="text-center">
        <router-link to="/signup" class="text-decoration-none">
          Sign Up
        </router-link>
      </p>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-{{ new Date().getFullYear() }}
      </p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "@/apis/authorization.js";
import { Toast } from "@/utils/helpers.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit(e) {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "Please fill out email and password",
          });
          return;
        }

        this.isProcessing = true;

        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });

        // data received via API request
        const { data } = response;

        // if error throw error
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // put data.token into localStorage
        localStorage.setItem("token", data.token);

        // put data.user to the state in Vuex
        this.$store.commit("setCurrentUser", data.user);

        // signin successful, redirect to /restaurants
        this.$router.push("/restaurants");
      } catch (error) {
        // signin failed

        this.password = "";
        this.isProcessing = false;

        Toast.fire({
          icon: "warning",
          title: "Please make sure your email and password are correct",
        });
      }
    },
  },
};
</script>
