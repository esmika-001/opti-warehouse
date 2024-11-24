import axiosInstance from "../config/axios";

export const signupService = (payload:any) => axiosInstance.post(`/auth/register`,{...payload} )
export const updateUserService = (data: any) => axiosInstance.patch(`/user`, data);
export const fetchUserService = () => axiosInstance.get(`/user`);
export const loginService = (payload:any) => axiosInstance.post(`/auth/login`,{...payload})
export const validateLoginService = (payload:any) => axiosInstance.post(`/auth/login/verify`,{...payload})