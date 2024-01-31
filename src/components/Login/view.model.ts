import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../common/models/user/auth";

const useLoginViewModel = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [error, setError] = useState<String>();
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
      if (!!token) {
        history.replace("/home");
      }
    }, [history, token]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const response = await login({ email: email, senha: senha });
        setToken(response.data.token);
        history.replace("/home");
      } catch (error) {
        setError("Erro ao tentar fazer login.");
      }
    };
  
  
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
  
      setEmail(value);
    };

    const handleChangeSenha = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
  
      setSenha(value);
    };

    return {
        email,
        senha,
        error,
        handleSubmit,
        handleChangeEmail,
        handleChangeSenha
    };
};

export default useLoginViewModel;