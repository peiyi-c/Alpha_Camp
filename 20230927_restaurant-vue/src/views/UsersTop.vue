<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div v-for="user in users" :key="user.id" class="col-3 col-sm-6">
        <router-link :to="{ name: 'user', params: { id: user.id } }">
          <img
            :src="user.image"
            style="width: 140px; height: 140px"
            width="140px"
            height="140px"
          />
        </router-link>
        <h2>{{ user.name }}</h2>
        <span class="badge badge-secondary"
          >追蹤人數：{{ user.FollowerCount || 0 }}</span
        >
        <p class="mt-3">
          <button
            v-if="user.isFollowed"
            type="button"
            class="btn btn-danger"
            @click.stop.prevent="deleteFollowing(user.id)"
          >
            取消追蹤
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="addFollowing(user.id)"
          >
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";

const dummyData = {
  users: [
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$RmEfHQwEkA3bc0yaburj2.MmSQyM.e1is8vGc5Y5b4CXhIsHRLgXu",
      isAdmin: false,
      image: "https://i.imgur.com/58ImzMM.png",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      Followers: [
        {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$uiOzMVMpsMUy./phdefdsOw4qNXXSHwDoMrqXWdA7pmyEszMCP9eC",
          isAdmin: true,
          image: null,
          createdAt: "2022-01-29T09:35:36.000Z",
          updatedAt: "2022-01-29T09:35:36.000Z",
          Followship: {
            followerId: 1,
            followingId: 2,
            createdAt: "2022-06-19T16:30:57.000Z",
            updatedAt: "2022-06-19T16:30:57.000Z",
          },
        },
      ],
      FollowerCount: 1,
      isFollowed: true,
    },
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$uiOzMVMpsMUy./phdefdsOw4qNXXSHwDoMrqXWdA7pmyEszMCP9eC",
      isAdmin: true,
      image: "https://i.imgur.com/58ImzMM.png",
      createdAt: "2022-01-29T09:35:36.000Z",
      updatedAt: "2022-01-29T09:35:36.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$oc68qwsjVY0rOaoQxQTrQ.OQ5JQf99OdTQX1v97/yVnzJ/FtKUDQW",
      isAdmin: false,
      image: "https://i.imgur.com/58ImzMM.png",
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
  ],
};
export default {
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
    fetchTopUsers() {
      this.users = dummyData.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          image: user.image,
          FollowerCount: user.FollowerCount,
          isFollowed: user.isFollowed,
        };
      });
    },

    addFollowing(id) {
      this.users = this.users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            FollowerCount: user.followerCount + 1,
            isFollowed: true,
          };
        }
        return user;
      });
    },
    deleteFollowing(id) {
      this.users = this.users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            FollowerCount: user.followerCount - 1,
            isFollowed: false,
          };
        }
        return user;
      });
    },
  },
};
</script>
