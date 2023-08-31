import { useState } from "react";
import { login } from "../../common/models/user/auth";

const useLoginViewModel = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        console.log({ email, password });
        try {
            setIsLoading(true);
            const response = await login({ email, password });
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Erro ao fazer login");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        password,
        setEmail,
        setPassword,
        isLoading,
        onSubmit,
    };
};

export default useLoginViewModel;