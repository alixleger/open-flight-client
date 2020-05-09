import axios from 'axios';
import User from '@/models/user';

const API_URL = 'https://api-openflight.alixleger.fr/';

class UserService {
  updateInfos(user: User) {
    return axios.patch(API_URL + 'auth/user', {email: user.email, password: user.password});
  }
}

export default new UserService();
