import API from "../../config/API";

export function isUserAuthenticated() {
  try {
    if (window.localStorage.getItem("userToken")) {
      return true;
    } else {
      return false;
    }
  } catch (e) {}
}

export async function login(email, password) {
  // post to authenticate endpoint
  // get JWT token and save it in the local storage
  const authRequest = await API.post("/authentication", {
    strategy: "local",
    email,
    password,
  });
  const jwtToken = authRequest.data.accessToken;
  if (jwtToken) {
    window.localStorage.setItem("userToken", authRequest.data.accessToken);
  } else {
    window.localStorage.setItem("userToken", null);
  }
}

export function logout() {
  window.localStorage.removeItem("userToken");
}

export async function register(email, password) {
  // post to authenticate endpoint
  // get JWT token and save it in the local storage
  await API.post("/users", {
    email,
    password,
  });
}
