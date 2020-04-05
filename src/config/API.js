import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://ec2-18-196-128-38.eu-central-1.compute.amazonaws.com:3030/";

export default axios.create({
  baseURL,
  responseType: "json"
});
