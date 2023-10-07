import { createStore } from "vuex";
import usersAPI from "@/apis/users.js";

export default createStore({
  //data()
  state: {
    currentUser: {
      id: -1,
      name: "",
      email: "",
      image: "",
      isAdmin: false,
    },
    isAuthenticated: false,
    token: "",
  },
  getters: {},
  //methods:
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // get through API
        ...currentUser,
      };
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
    },
    revokeAuthentication(state) {
      state.currentUser = {};
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  // get data throught API
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser();

        const { id, name, email, image, isAdmin } = data;
        commit("setCurrentUser", {
          id,
          name,
          email,
          image,
          isAdmin,
        });

        //login valid
        return true;
      } catch (error) {
        console.log(error.message);

        commit("revokeAuthentication");
        //login invalid
        return false;
      }
    },
  },

  modules: {},
});
