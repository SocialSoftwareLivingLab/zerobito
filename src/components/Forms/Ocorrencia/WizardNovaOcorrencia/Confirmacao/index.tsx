import React from 'react';
import { useOcorrenciaWizardContext } from '../../../../../pages/Ocorrencia/Cadastro/context';
import ConfirmacaoOcorrenciaView from './view';
import { useUsuarioAutenticado } from '../../../../../contexts/usuario-autenticado';

export default function ConfirmacaoOcorrencia() {
    const { formData } = useOcorrenciaWizardContext();
    const { data: usuario } = useUsuarioAutenticado();
    return <ConfirmacaoOcorrenciaView data={formData} usuario={usuario} />;
}
