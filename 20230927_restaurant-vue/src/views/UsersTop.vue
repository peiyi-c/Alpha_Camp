<template>
  <div class="container py-5">
    <!-- NavTabs  -->
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">Culinary Delights Pros</h1>
      <hr />
      <div class="row text-center">
        <div v-for="user in users" :key="user.id" class="col-3 col-sm-6">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <img
              :src="emptyImage(user.image)"
              style="width: 140px; height: 140px"
              width="140px"
              height="140px"
            />
          </router-link>
          <h2>{{ user.name }}</h2>
          <span class="badge badge-secondary"
            >Followers: {{ user.followerCount || 0 }}</span
          >
          <p class="mt-3">
            <button
              v-if="user.isFollowed"
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
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";
import { emptyImageFilter } from "@/utils/mixins";
import usersAPI from "@/apis/users.js";
import { Toast } from "@/utils/helpers.js";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "UsersTop",
  mixins: [emptyImageFilter],
  components: {
    NavTabs,
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
      isProcessing: false,
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        this.isLoading = true;
        const { data } = await usersAPI.getTopUser();

        this.users = data.users.map((user) => {
          return {
            id: user.id,
            name: user.name,
            image: user.image,
            followerCount: user.FollowerCount,
            isFollowed: user.isFollowed,
          };
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "Can not get Culinary Delights Pros data, please try it later",
        });
      }
    },
    async addFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true,
            };
          }
          return user;
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can not follow, please try it later",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false,
            };
          }
          return user;
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can not unfollow, please try it later",
        });
      }
    },
  },
};
</script>
