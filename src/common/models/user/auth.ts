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

enum UserRole {
  ADMIN = 1,
  USER = 2
}

export const login = async ({ email, senha }: any) => {

  try {
    const response = await api.post(`/login`, {
      email,
      senha
    });
    console.log(response);
    const token = response.data.token;
    const nome = response.data.nome;
    const emailUser = response.data.email;
    const role = response.data.role;
    storeData(token);
    storeName(nome);
    storeEmail(emailUser);
    storeRole(role);
    return response;

  } catch (error: any) {
    return Promise.reject(error.response.data.error);
  }
};

export const storeData = (token: string) => {
  localStorage.setItem("token", token);
};

export const storeName = (nome: string) => {
  console.log("Storing name:", nome);
  localStorage.setItem("nome", nome);
}

export const storeEmail = (email: string) => {
  console.log("Storing email:", email);
  localStorage.setItem("email", email);
}

export const storeRole = (role: UserRole) => {
  console.log("Storing role:", role);
  const roleString = UserRole[role]; // Convert enum value to its string representation
  localStorage.setItem("role", roleString);
}


export const removeData = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};



