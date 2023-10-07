import axios from "axios";
import Swal from "sweetalert2";

// link deprecated...
// const baseURL = "https://forum-express-api.herokuapp.com/api";

// local
const baseURL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // take token from localStorage
    const token = localStorage.getItem("token");

    // if token exists, put it into headers
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export const apiHelper = axiosInstance;

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
