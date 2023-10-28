import api from "../../api";
import { UserModel } from "./user.model";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      removeData()
      return;
    }
    return Promise.reject(error);
  }
);

export const login = async({ email, senha }: any) => {
 
  try {
    const response = await api.post(`/login`, { 
      email,
      senha
    });
    const token = response.data.token;
    storeData(token);
    return response;

  } catch (error: any) {
    return Promise.reject(error.response.data.error);
  }
};


export const storeData = (token: string) => {
    localStorage.setItem("token", token);
};
  
export const removeData = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
};



