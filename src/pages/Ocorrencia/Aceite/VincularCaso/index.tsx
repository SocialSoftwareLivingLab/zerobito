import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { vincularOcorrenciaAoCaso } from '../../../../common/api/ocorrencias/vincular-ocorrencia';
import { Caso } from '../../../../common/models/caso/caso';
import { OcorrenciaModel } from '../../../../common/models/ocorrencias/model';
import { SelecionarCasoTable } from '../../../../components/Tabelas/Casos/SelecionarCaso';
import { Button } from '../../../../components/ui/Button';
import { Secao } from '../styles';
import { ConfirmacaoButtonGroup } from './styles';

export interface VincularOcorrenciaAoCasoPageProps {
    ocorrencia: OcorrenciaModel;
}

export default function VincularOcorrenciaAoCasoPage(data: VincularOcorrenciaAoCasoPageProps) {
    const [casoSelecionado, setCasoSelecionado] = useState<Caso | null>(null);

    const navigate = useNavigate();

    const handleVinculoConfirmado = useCallback(async () => {
        if (!casoSelecionado) {
            await Swal.fire({
                title: 'Oops!',
                text: 'É necessário selecionar um caso para realizar o vínculo',
                icon: 'error',
                confirmButtonText: 'Continuar'
            });

            return;
        }

        await vincularOcorrenciaAoCaso({
            ocorrencia: {
                id: data.ocorrencia.id
            },
            caso: {
                id: casoSelecionado.id
            }
        });

        await Swal.fire({
            title: 'Sucesso!',
            text: 'O evento foi vinculado ao caso selecionado',
            icon: 'success',
            confirmButtonText: 'Continuar'
        });

        navigate('/home');
    }, [casoSelecionado, data.ocorrencia.id, navigate]);

    return (
        <Secao>
            <h3>Selecione o caso para realizar o vínculo</h3>

            <SelecionarCasoTable handleCasoSelecionado={setCasoSelecionado} />

            <ConfirmacaoButtonGroup>
                <Button disabled={!casoSelecionado} action={handleVinculoConfirmado}>
                    Confirmar e realizar vínculo
                </Button>
            </ConfirmacaoButtonGroup>
        </Secao>
    );
}
