import UserService from '@/services/user.service';
import User from '@/models/user';

export const user = {
  namespaced: true,
  actions: {
    updateInfos(_: any, user: User) {
      return UserService.updateInfos(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};
