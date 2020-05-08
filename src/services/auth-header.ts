export default function authHeader() {
    const item = localStorage.getItem('user');
    const user = item ? JSON.parse(item) : null;
  
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
  