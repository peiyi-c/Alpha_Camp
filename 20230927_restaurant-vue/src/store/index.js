import { createStore } from "vuex";
import usersAPI from "@/apis/users.js";
import { Toast } from "@/utils/helpers.js";

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
      state.isAuthenticated = true;
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
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  modules: {},
});
