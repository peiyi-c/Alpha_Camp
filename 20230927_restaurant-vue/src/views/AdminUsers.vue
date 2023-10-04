<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <!-- admin users list -->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? "admin" : "user" }}</td>

          <td>
            <button
              v-if="currentUser.id !== user.id"
              @click.stop.prevent="toggleUserRole(user.id)"
              type="button"
              class="btn btn-link"
            >
              {{ user.isAdmin ? "set as user" : "set as admin" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav.vue";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$uiOzMVMpsMUy./phdefdsOw4qNXXSHwDoMrqXWdA7pmyEszMCP9eC",
      isAdmin: true,
      image: null,
      createdAt: "2022-01-29T09:35:36.000Z",
      updatedAt: "2022-01-29T09:35:36.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$RmEfHQwEkA3bc0yaburj2.MmSQyM.e1is8vGc5Y5b4CXhIsHRLgXu",
      isAdmin: false,
      image: null,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$oc68qwsjVY0rOaoQxQTrQ.OQ5JQf99OdTQX1v97/yVnzJ/FtKUDQW",
      isAdmin: false,
      image: null,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
    },
  ],
};
const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
      currentUser: {},
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      // this.users
      this.users = dummyData.users;
      // this.currentUser
      this.currentUser = dummyUser.currentUser;
    },
    toggleUserRole(userId) {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: !user.isAdmin,
          };
        } else {
          return user;
        }
      });
    },
  },
};
</script>
