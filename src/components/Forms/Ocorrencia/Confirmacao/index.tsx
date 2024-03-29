import React from 'react';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import ConfirmacaoOcorrenciaView from './view';

export default function ConfirmacaoOcorrencia() {
    const { formData } = useOcorrenciaWizardContext();
    return <ConfirmacaoOcorrenciaView data={formData} />;
}
