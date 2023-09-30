<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-5">
        <img :src="user.image" style="width: 300px; height: 300px" />
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
              <!-- <router-link
              :to="{ name: 'user-edit', params: { id: user.id } }"
              class="btn btn-primary"
            >
              Edit
            </router-link> -->
              <button class="btn btn-primary">Edit</button>
            </div>
            <div v-else>
              <button
                v-if="isFollowed"
                type="button"
                class="btn btn-danger"
                @click.stop.prevent="deleteFollowing()"
              >
                Unfollow
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                @click.stop.prevent="addFollowing()"
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
export default {
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
    };
  },

  methods: {
    addFollowing() {
      this.isFollowed = true;
    },
    deleteFollowing() {
      this.isFollowed = false;
    },
  },
};
</script>
