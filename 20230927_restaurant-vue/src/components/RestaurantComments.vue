<template>
  <div>
    <h2 class="my-4">All comments:</h2>
    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
          type="button"
          class="btn btn-danger float-right"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{ name: 'user', params: { id: comment.UserId } }">
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ fromNow(comment.createdAt) }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>
<script>
import { fromNowFilter } from "@/utils/mixins.js";
import commentsAPI from "@/apis/comments.js";
import { Toast } from "@/utils/helpers.js";
import { mapState } from "vuex";

export default {
  name: "RestaurantComments",
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        const { data } = await commentsAPI.delete({ commentId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "Comment deleted!",
        });

        this.$emit("after-delete-comment", commentId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not remove comment, please try it later.",
        });
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>
