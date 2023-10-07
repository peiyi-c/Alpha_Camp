<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-5">
        <img
          :src="emptyImage(user.image)"
          style="width: 300px; height: 300px"
        />
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title">
            {{ user.name }}
          </h5>
          <p class="card-text">
            {{ user.email }}
          </p>
          <ul class="list-unstyled">
            <li>
              <strong>{{ user.commentsLength }}</strong> commented restaurants
            </li>
            <li>
              <strong>{{ user.favoritedRestaurantsLength || 0 }}</strong>
              favorite restaurants
            </li>
            <li>
              <strong>{{ user.followingsLength || 0 }}</strong> followings
            </li>
            <li>
              <strong>{{ user.followersLength || 0 }}</strong> followers
            </li>
          </ul>

          <div class="d-flex justify-content-start">
            <div class="mr-2" v-if="isCurrentUser">
              <router-link
                :to="{ name: 'user-edit', params: { id: user.id } }"
                class="btn btn-primary"
              >
                Edit
              </router-link>
            </div>
            <div v-else>
              <button
                v-if="isFollowed"
                :disabled="isProcessing"
                type="button"
                class="btn btn-danger"
                @click.stop.prevent="deleteFollowing(user.id)"
              >
                Unfollow
              </button>
              <button
                v-else
                :disabled="isProcessing"
                type="button"
                class="btn btn-primary"
                @click.stop.prevent="addFollowing(user.id)"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from "@/utils/mixins";
import usersAPI from "@/apis/users.js";
import { Toast } from "@/utils/helpers.js";

export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
    isCurrentUser: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
      isFollowed: this.initialIsFollowed,
      isProcessing: false,
    };
  },

  methods: {
    async addFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.isFollowed = true;
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can not follow user, please try it later",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteFollowing({
          userId,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.isFollowed = false;
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can not unfollow user, please try it later",
        });
      }
    },
  },
  watch: {
    initialIsFollowed(isFollowed) {
      this.isFollowed = isFollowed;
    },
    initialUser(newValue) {
      this.user = {
        ...this.initialUser,
        ...newValue,
      };
    },
  },
};
</script>
