import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class UserApi {
    userApi = axios.create({
        baseURL: API_BASE_URL + '/users',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    async registerUser(userData) {
        const res = await this.userApi.post('/register', userData);
        return res.data;
    }

    async loginUser(credentials) {
        const res = await this.userApi.post('/login', credentials);
        console.log(res.data);
        return res.data;
    }

    async logoutUser() {
        const res = await this.userApi.post('/logout', true);
        return res.data;
    }
}

export default new UserApi();
