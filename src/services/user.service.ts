import axios from 'axios';
import User from '@/models/user';

class UserService {
  updateInfos(user: User) {
    return axios.patch(`${process.env.VUE_APP_API_URL}auth/user`, {email: user.email, password: user.password});
  }
}

export default new UserService();
