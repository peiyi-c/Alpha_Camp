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

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup"> Sign Up </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
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
    handleSubmit(e) {
      if (!this.email || !this.password) {
        Toast.fire({
          icon: "warning",
          title: "Please fill out email and password",
        });
        return;
      }
      this.isProcessing = true;

      authorizationAPI
        .signIn({
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // data received via API request
          const { data } = response;
          // if error throw error
          if (data.status === "error") {
            throw new Error(data.message);
          }
          // put data.token into localStorage
          localStorage.setItem("token", data.token);
          // signin successful, redirect to /restaurants
          this.$router.push("/restaurants");
        })
        .catch((error) => {
          this.password = "";
          Toast.fire({
            icon: "warning",
            title: "Please make sure your password is correct",
          });
          // signin failed
          this.isProcessing = false;
          console.log("error", error);
        });
    },
  },
};
</script>
