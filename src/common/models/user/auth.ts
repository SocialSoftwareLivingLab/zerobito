import client from "../../client";
import { UserModel } from "./user.model";


client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
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

export const login = async ({email, password} : any) => {
  try {
    const response = await client.post<UserModel>(`/login`, {
      email,
      password,
    });
    const token = response.data.token;
    storeData(token);

    return response;
  } catch (error: any) {
    return Promise.reject(error.response.data.error);
  }
};


export const storeData = (token: string) => {
    localStorage.setItem("adminToken", token);
};
  
export const removeData = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
};



