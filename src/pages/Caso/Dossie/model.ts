import { useState, useEffect, useCallback } from 'react';
import { listarOcorrencias } from '../../../common/api/casos/consultarOcorrencias';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import { getReunioes } from '../../../common/api/casos/planejamento/get-reunioes-marcadas';

const useDossieViewModel = (id: number) => {
    const [eventos, setOcorrencias] = useState<OcorrenciaModel[]>([]);

    useEffect(() => {
        listarOcorrencias(id).then((response) => {
            setOcorrencias(response.data);
        });
    }, [id]);

    return {
        eventos
    };
};

export default useDossieViewModel;
