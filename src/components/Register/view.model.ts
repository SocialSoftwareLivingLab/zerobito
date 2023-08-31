import { useState } from "react";
import { register } from "../../common/models/user/create.user";

const useRegisterViewModel = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSubmit = async () => {
        console.log({ name, email, password });
        try {
            const response = await register({ name, email, password });
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Erro ao fazer login");
        }
    };

    return {
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        onSubmit,
    };
};

export default useRegisterViewModel;
