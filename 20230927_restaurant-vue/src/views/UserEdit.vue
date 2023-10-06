<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        />
        <input
          @click="handleFileChange"
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
        />
      </div>

      <button :disabled="isProcessing" type="submit" class="btn btn-primary">
        {{ isProcessing ? "Processing" : "Submit" }}
      </button>
    </form>
  </div>
</template>
<script>
import usersAPI from "@/apis/users.js";
import { Toast } from "@/utils/helpers.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: {
        id: 0,
        name: "",
        email: "",
        image: "",
      },
      isProcessing: false,
    };
  },
  created() {
    if (this.currentUser.id === -1) return;
    const { id } = this.$route.params;
    this.setUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    if (this.currentUser.id === -1) return;
    const { id } = to.params;
    this.setUser(id);
    next();
  },
  methods: {
    setUser(userId) {
      const { id, image, name, email } = this.currentUser;

      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: "NotFound" });
        return;
      }

      this.user = {
        ...this.user,
        id,
        name,
        email,
        image,
      };
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.user.image = "";
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.image = imageURL;
      }
    },
    async handleSubmit(e) {
      try {
        if (!this.user.name) {
          Toast.fire({
            icon: "error",
            title: "Name can not be empty",
          });
          return;
        }
        // for (const [key, value] of formData.entries()) {
        //   console.log(key + ": " + value);
        // }
        this.isProcessing = true;

        const form = e.target;
        const formData = new FormData(form);
        const { data } = await usersAPI.update({
          userId: this.user.id,
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.$router.push({ name: "user", params: { id: this.user.id } });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can not get user data, please try it later",
        });
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    currentUser(user) {
      if (user.id === -1) return;
      const { id } = this.$route.params;
      this.setUser(id);
    },
  },
};
</script>
