import { useState, useEffect } from 'react';
import { carregarOcorrencias } from '../../common/models/ocorrencias/get.ocorrencia';
import { OcorrenciaModel } from '../../common/models/ocorrencias/model';

const useHomeViewModel = () => {
    const [eventos, setOcorrencias] = useState<OcorrenciaModel[]>([]);

    useEffect(() => {
        carregarOcorrencias().then((response) => {
            setOcorrencias(response.data);
        });
    }, []);

    return {
        eventos
    };
};

export default useHomeViewModel;
