import axios from "axios";
import User from "@/models/user";

class AuthService {
  login(user: User) {
    return axios
      .post(`${process.env.VUE_APP_API_URL}login`, {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  async logout() {
    await axios.post(`${process.env.VUE_APP_API_URL}logout`);
    localStorage.removeItem("user");
  }

  register(user: User) {
    return axios.post(`${process.env.VUE_APP_API_URL}register`, {
      email: user.email,
      password: user.password
    });
  }

  refreshToken() {
    return axios
      .get(`${process.env.VUE_APP_API_URL}auth/refresh_token`)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  }
}

export default new AuthService();
