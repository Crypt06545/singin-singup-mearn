import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

//authenticate user
export const singUp = (formData) => API.post('/singup', formData);
export const singIn = (formData) => API.post('/singin', formData);
export const deleteAccount = (id) => API.delete(`/delete_account/${id}`);
export const searchUsers = (searchKey) => API.patch('/search_user', { searchKey });
export const changePassworsd = (formData) => API.patch('/changePassworsd', formData);
export const verifyAccount = (formData) => API.patch('/verify', formData);