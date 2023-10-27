import { useState } from "react";

const usePainelViewModel = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handleStatusChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStatus(event.target.value);
    }

    return {
        nome,
        email,
        status,
        handleNomeChange,
        handleEmailChange,
        handleStatusChange,
    };
};

export default usePainelViewModel;
