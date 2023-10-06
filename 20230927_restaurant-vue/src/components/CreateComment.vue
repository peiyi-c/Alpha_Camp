<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">Leave Comment:</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        Back
      </button>
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>
<script>
import commentsAPI from "@/apis/comments.js";
import { Toast } from "@/utils/helpers.js";

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.text) {
          Toast.fire({
            icon: "warning",
            title: "Comment can not be empty",
          });
          return;
        }
        const { data } = await commentsAPI.create({
          commentId: crypto.randomUUID(),
          restaurantId: this.restaurantId,
          text: this.text,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.$emit("after-create-comment", {
          commentId: data.commentId,
          restaurantId: this.restaurantId,
          text: this.text,
        });
        // empty textarea
        this.text = "";
      } catch (error) {
        console.error(error.message);

        Toast.fire({
          icon: "error",
          title: "Can not add new comment, please try it later",
        });
      }
    },
  },
};
</script>
