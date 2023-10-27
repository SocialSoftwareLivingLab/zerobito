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
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        const response = await login({ email: email, senha });
        setToken(response.data.token);
        history.replace("/home");
      } catch (error) {
        setError(String(error));
      }
    };
  
  
    const handleChange = (e: any) => {
      e.preventDefault();
      const { name, value } = e.target;
  
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "senha":
          setSenha(value);
          break;
        default:
          break;
      }
  
    };

    return {
        email,
        senha,
        error,
        handleSubmit,
        handleChange
    };
};

export default useLoginViewModel;