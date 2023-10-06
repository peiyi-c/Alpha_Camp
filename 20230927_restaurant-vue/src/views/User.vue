<template>
  <div class="container py-5">
    <!-- UserProfileCard -->
    <UserProfileCard
      :initial-user="profile"
      :initial-is-followed="isFollowed"
      :is-current-user="currentUser.id === profile.id"
    />
    <div class="row">
      <div class="col-md-4">
        <!-- UserFollowingsCard -->
        <UserFollowingsCard :followings="followings" />
        <!-- UserFollowersCard -->
        <UserFollowersCard :followers="followers" />
      </div>
      <div class="col-md-8">
        <!-- UserCommentsCard -->
        <UserCommentsCard :comments="comments" />
        <!-- UserFavoritedRestaurantsCard -->
        <UserFavoritedRestaurantsCard
          :favoritedRestaurants="favoritedRestaurants"
        />
      </div>
    </div>
  </div>
</template>
<script>
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserFollowingsCard from "@/components/UserFollowingsCard.vue";
import UserFollowersCard from "@/components/UserFollowersCard.vue";
import UserCommentsCard from "@/components/UserCommentsCard.vue";
import UserFavoritedRestaurantsCard from "@/components/UserFavoritedRestaurantsCard.vue";

import usersAPI from "@/apis/users.js";
import { Toast } from "@/utils/helpers.js";
import { mapState } from "vuex";

export default {
  name: "User",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data() {
    return {
      profile: {
        id: -1,
        name: "",
        email: "",
        image: "",
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoritedRestaurantsLength: 0,
      },
      isFollowed: false,
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: [],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUser(id);
    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.get({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { profile, isFollowed } = data;
        const {
          id,
          image,
          name,
          email,
          Followings,
          Followers,
          Comments,
          FavoritedRestaurants,
        } = profile;
        this.profile = {
          ...this.profile,
          id,
          image,
          name,
          email,
          followingsLength: Followings.length,
          followersLength: Followers.length,
          commentsLength: Comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length,
        };
        this.isFollowed = isFollowed;
        this.followings = Followings;
        this.followers = Followers;
        this.favoritedRestaurants = FavoritedRestaurants;

        this.comments = Comments.filter((comment) => comment.Restaurant);
      } catch (error) {
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
};
</script>
