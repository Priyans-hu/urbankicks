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
        localStorage.setItem('userEmail', res.data.user.email);
        return res.data;
    }

    async logoutUser() {
        const res = await this.userApi.post('/logout', true);
        return res.data;
    }
    
    async getUserDetails(email) {
        try {
            const res = await this.userApi.get('/details', email);
            return res.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    }
}

export default new UserApi();
