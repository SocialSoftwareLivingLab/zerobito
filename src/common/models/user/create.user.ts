import { UserModel } from "./user.model";
import client from "../../client";

export interface registerDTO{
    name: string;
    email: string;
    password: string;
}

export const register = async({name, email, password}: registerDTO) => {
    const response = await client.post<UserModel>("/register", {
        name, 
        email, 
        password
    });
    return response;
};

