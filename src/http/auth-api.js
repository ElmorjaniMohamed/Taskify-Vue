import api from "./api"

export const CsrfCookie = () => api.get('/sanctum/csrf-cookie')

export const login = (Credentials) =>api.post('/auth/login', Credentials) 

export const register = (user) =>api.post('/auth/register', user) 

export const logout = () =>api.post('/auth/logout') 

export const getUser = () => api.get("/api/user")