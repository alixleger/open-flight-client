import axios from 'axios';
import User from '@/models/user';

const API_URL = 'https://api-openflight.alixleger.fr/';

class AuthService {
  login(user: User) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user: User) {
    return axios.post(API_URL + 'register', {
      email: user.email,
      password: user.password
    });
  }

  refreshToken() {
    return axios
      .get(API_URL + 'auth/refresh_token')
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
      })
  }
}

export default new AuthService();
