import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { DossieCardStyle } from './styles';
import { FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import { BsPaperclip } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { DenuncianteFormInput } from '../Forms/Ocorrencia/Denunciante/model';
import { DossieView, InfoGeralViewProps } from './Info-Geral';
import { DossieForm } from './Info-Geral/model';
import { FormStepApi } from './interface';

interface DossieCardProps {
    data: {
        CausaPrimaria: string;
        CausaSecundaria: string;
        Diagnostico: string;
        Comentario: string;
    };
    dota: string[];
}

export interface RegistrarOcorrenciaViewProps {
    handles: {
        handleCompleteWizard: (data: DossieForm) => void;
        handleNextStep: (handleNext: () => void) => void;
        handlePreviousStep: (handleBack: () => void) => void;
    };
    refs: {
        formLocalRef: React.RefObject<FormStepApi>;
        formVitimaRef: React.RefObject<FormStepApi>;
        formDenuncianteRef: React.RefObject<FormStepApi>;
        formGravidadeRef: React.RefObject<FormStepApi>;
    };
}

export function DossieCard(
    { data, dota }: DossieCardProps,
    { register, errors, handleCompleteEdit }: InfoGeralViewProps
) {
    return (
        <DossieCardStyle>
            <header>
                <h2>Caso N {dota[0]}</h2>
            </header>
            <div className="row">
                <div className="column">
                    <h3>Data de Denúncia</h3>
                    <span>{dota[1]}</span>
                </div>
                <div className="column">
                    <h3>Status de notificação obrigatória</h3>
                    <span>{dota[2]}</span>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <h3>Atores Convidados</h3>
                    <span>{dota[3]} Atores</span>
                </div>

                <div className="column">
                    <h3>Próxima Reunião</h3>
                    <span>{data[4]}</span>
                </div>
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaInfoCircle /> Informações Gerais
                </h3>
            </div>
            <div>
                <DossieView />
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaInfoCircle /> Palavras-chave
                </h3>
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <BsPaperclip /> Arquivos
                </h3>
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaLocationDot /> Localização
                </h3>
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaFileAlt /> Materiais Relacionados
                </h3>
            </div>
        </DossieCardStyle>
    );
}
export { InfoGeralViewProps };
