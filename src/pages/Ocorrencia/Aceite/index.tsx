import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { buscarOcorrencia } from '../../../common/api/ocorrencias/buscar-ocorrencia';
import { OcorrenciaCarregadaType } from './models';
import AceitarOcorrenciaPageView from './view';
import Swal from 'sweetalert2';

type AceitarOcorrenciaPageQueryParams = {
    id: string;
};

export type OpcaoAceiteSelecionado = 'criar' | 'vincular';

export default function AceitarOcorrenciaPage() {
    const { id } = useParams<AceitarOcorrenciaPageQueryParams>();
    const [ocorrenciaData, setOcorrenciaData] = useState<OcorrenciaCarregadaType>({
        loading: true,
        success: false,
        data: null
    });

    const [opcaoAceiteSelecionada, setOpcaoAceiteSelecionada] = useState<
        OpcaoAceiteSelecionado | undefined
    >(undefined);

    useEffect(() => {
        async function buscarDado() {
            try {
                const ocorrencia = await buscarOcorrencia(id);
                setOcorrenciaData({
                    loading: false,
                    success: true,
                    data: ocorrencia.data
                });
            } catch (err) {
                setOcorrenciaData({
                    loading: false,
                    success: false,
                    data: null
                });
            }
        }

        buscarDado();
    }, [id]);

    if (!ocorrenciaData.success && !ocorrenciaData.loading) {
        Swal.fire({
            title: 'Ocorrência não encontrada!',
            text: 'Essa ocorrência não existe. Essa mensagem será substituída por uma página padrão de not found',
            icon: 'error',
            timer: 4000,
            confirmButtonText: 'Continuar'
        });
        return <Navigate to="/" replace />;
    }

    return (
        <AceitarOcorrenciaPageView
            ocorrencia={ocorrenciaData}
            opcaoAceiteSelecionada={opcaoAceiteSelecionada}
            setOpcaoAceiteSelecionada={setOpcaoAceiteSelecionada}
        />
    );
}
