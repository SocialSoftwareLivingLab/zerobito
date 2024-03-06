import { useState, useEffect } from "react";
import { carregarOcorrencias } from "../../common/models/ocorrencias/get.ocorrencia";

const useHomeViewModel = () => {
    const [casos, setOcorrencias] = useState<any[]>([]);

    useEffect(() => {
        carregarOcorrencias().then((response) => {
            setOcorrencias(response.data);
        });
    }, []);

    return {
        casos
    };
};

export default useHomeViewModel;
