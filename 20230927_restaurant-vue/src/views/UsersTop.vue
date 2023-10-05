<template>
  <div class="container py-5">
    <!-- NavTabs  -->
    <NavTabs />
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
            type="button"
            class="btn btn-danger"
            @click.stop.prevent="deleteFollowing(user.id)"
          >
            Unfollow
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="addFollowing(user.id)"
          >
            Follow
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";
import { emptyImageFilter } from "@/utils/mixins";
import usersAPI from "@/apis/users.js";
import { Toast } from "@/utils/helpers.js";

export default {
  mixins: [emptyImageFilter],
  components: {
    NavTabs,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUser();
        console.log(data);
        this.users = data.users.map((user) => {
          return {
            id: user.id,
            name: user.name,
            image: user.image,
            followerCount: user.FollowerCount,
            isFollowed: user.isFollowed,
          };
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not get Culinary Delights Pros data, please try it later",
        });
      }
    },
    async addFollowing(userId) {
      try {
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
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not follow, please try it later",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
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
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not unfollow, please try it later",
        });
      }
    },
  },
};
</script>
