import { apiHelper } from "./../utils/helpers";

export default {
  signIn({ email, password }) {
    // return a Promise
    return apiHelper.post("/signin", {
      email,
      password,
    });
  },
};
