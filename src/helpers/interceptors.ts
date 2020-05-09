import axios from 'axios';
import router from '@/router';
import AuthService from '@/services/auth.service';

export default function setup() {
    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status !== 401 
            || error.config.url.includes('login')
            || error.config.url.includes('register')) {
            return new Promise((_, reject) => {
                reject(error);
            });
        }

        if (error.config.url.includes('auth/refresh_token')) {
            AuthService.logout();
            router.push({name: "Login"});

            return new Promise((_, reject) => {
                reject(error);
            });
        }

        AuthService.refreshToken().then(_ => {
            const item = localStorage.getItem('user');
            const user = item ? JSON.parse(item) : null;
    
            if (!(user && user.token)) {
                return new Promise((_, reject) => {
                    reject(error);
                });
            }
    
            const config = error.config;
            config.headers['Authorization'] = 'Bearer ' + user.token;

            return new Promise((resolve, reject) => {
                axios.request(config).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            }).catch(error => {
                Promise.reject(error);
            });
        });
    });

    axios.interceptors.request.use(config => {
        const item = localStorage.getItem('user');
        const user = item ? JSON.parse(item) : null;
        if (user && user.token) {
            config.headers.Authorization = 'Bearer ' + user.token;
        }

        return config;
    });
}
