import { useState, useEffect } from "react";
import { carregarOcorrencias } from "../../common/models/ocorrencias/get.ocorrencia";

const useHomeViewModel = () => {
    const [ocorrencias, setOcorrencias] = useState<any[]>([]);

    useEffect(() => {
        carregarOcorrencias().then((response) => {
            setOcorrencias(response.data);
        });
    }, []);

    return {
        ocorrencias
    };
};

export default useHomeViewModel;
