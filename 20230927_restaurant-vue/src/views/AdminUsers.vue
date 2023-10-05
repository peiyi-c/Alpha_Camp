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
              @click.stop.prevent="
                toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })
              "
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
import adminAPI from "@/apis/admin.js";
import { Toast } from "@/utils/helpers.js";

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
    async fetchUser() {
      try {
        const { data } = await adminAPI.users.get();
        if (data.status === "error") {
          throw new Error(data.message);
        }
        // this.users
        this.users = data.users;
        // this.currentUser
        this.currentUser = dummyUser.currentUser;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can not get user data, please try it later",
        });
      }
    },
    async toggleUserRole({ userId, isAdmin }) {
      try {
        const { data } = await adminAPI.users.update({
          userId,
          isAdmin: !isAdmin,
        });

        console.log(data);

        if (data.status === "error") {
          throw new Error(data.message);
        }

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

        Toast.fire({
          icon: "success",
          title: "User role changed successfully",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Can not change user role, please try it later",
        });
      }
    },
  },
};
</script>
