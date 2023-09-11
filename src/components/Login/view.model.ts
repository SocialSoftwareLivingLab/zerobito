import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { login } from "../../common/models/user/auth";

const useLoginViewModel = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<String>();
    const [token, setToken] = useState(localStorage.getItem("token"));
    
    useEffect(() => {
        if (!!token) {
          history.replace("/");
        }
      }, [history, token]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const response = await login({ email: email, password});
          setToken(response.data.token);
          console.log("Deu Certo");
        } catch (error: any) {
          setError(String(error));
          console.log(error);
        }    
    };
    
    const handleChange = (e: any) => {
      e.preventDefault();
      const { name, value } = e.target;
  
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          break;
        default:
          break;
      }
  
    };

    return {
        email,
        password,
        error,
        handleSubmit,
        handleChange
    };
};

export default useLoginViewModel;