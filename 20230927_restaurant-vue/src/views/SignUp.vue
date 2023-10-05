<template>
  <div class="container py-5">
    <form class="w-100" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
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
          autocomplete="new-password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        {{ isProcessing ? "Processing" : "Submit" }}
      </button>

      <button class="btn btn-outline-primary btn-block">
        <router-link to="/signin" class="signin text-decoration-none">
          Sign In
        </router-link>
      </button>

      <p class="mt-5 mb-3 text-muted text-center">
        © 2017-{{ new Date().getFullYear() }}
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
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit(e) {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: "warning",
            title: "Please make sure to fill out all fields",
          });
          return;
        }
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "password and check do not match",
          });
          this.passwordCheck = "";
          return;
        }

        this.isProcessing = true;
        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        });
        // if failed, throw error
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.isProcessing = false;
        Toast.fire({
          icon: "success",
          title: data.message,
        });

        // if successful, direct to signin
        this.$router.push("/signin");
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: `Can not sign up -  ${error.message}`,
        });
      }
    },
  },
};
</script>
<style scoped>
.btn:hover .signin {
  color: #ffffff;
}
</style>
