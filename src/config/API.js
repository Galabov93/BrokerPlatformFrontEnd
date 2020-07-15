import axios from "axios";
import { logout } from "../services/Authentication";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030/"
    : "http://ec2-3-127-248-27.eu-central-1.compute.amazonaws.com:3030";

const token = window.localStorage.getItem("userToken");

const instance = axios.create({
  baseURL,
  responseType: "json",
  headers: {
    Authorization: "Bearer " + token,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error");
    if (error.response.status === 401) {
      //place your reentry code
      console.log("error 401");
      logout();
      window.location.reload();
    }
    return error;
  }
);

export default instance;
