import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "localhost:3030/"
    : "http://ec2-3-127-248-27.eu-central-1.compute.amazonaws.com:3030";

export default axios.create({
  baseURL,
  responseType: "json",
});
