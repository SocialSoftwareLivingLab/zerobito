import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { aceitarOcorrenciaComoCaso } from '../../../../common/api/ocorrencias/aceitar-ocorrencia';
import { OcorrenciaModel } from '../../../../common/models/ocorrencias/model';
import CriarCasoForm from '../../../../components/Forms/Caso';
import { CriarCasoFormData } from '../../../../components/Forms/Caso/models';
import { Secao } from '../styles';

export interface NovoCasoPageProps {
    ocorrencia: OcorrenciaModel;
}

export default function NovoCasoPage({ ocorrencia }: NovoCasoPageProps) {
    const navigate = useNavigate();
    const submit = async (data: CriarCasoFormData) => {
        console.log(ocorrencia);
        console.log(data);

        await aceitarOcorrenciaComoCaso({
            ocorrencia: { id: ocorrencia.id },
            caso: { nome: data.nome, coordenador: { id: data.coordenador } }
        });

        await Swal.fire({
            title: 'Cadastro Realizado!',
            text: 'Usuário foi criado com sucesso',
            icon: 'success',
            timer: 4000,
            confirmButtonText: 'Continuar'
        });

        navigate('/home');
    };

    return (
        <Secao>
            <h3>Dados do novo caso</h3>

            <CriarCasoForm submit={submit} />
        </Secao>
    );
}
