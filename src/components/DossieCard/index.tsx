import React from 'react';
import { DossieCardStyle } from './styles';
import { FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import { BsPaperclip } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import TextEditavel from '../ui/text_editavel';
import PalavraChave from '../ui/PalavraChave';

interface DossieCardProps {
    data: string[];
}

export function DossieCard({ data }: DossieCardProps) {
    return (
        <DossieCardStyle>
            <header>
                <h2>Caso N {data[0]}</h2>
            </header>
            <div className="row">
                <div className="column">
                    <h3>Data de Denúncia</h3>
                    <span>{data[1]}</span>
                </div>
                <div className="column">
                    <h3>Status de notificação obrigatória</h3>
                    <span>{data[2]}</span>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <h3>Atores Convidados</h3>
                    <span>{data[3]} Atores</span>
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
                <h3>Causa Primária</h3>
                <TextEditavel options={['acidente', 'doença', 'alergia']} label={''}></TextEditavel>
                <h3>Causa Secundária</h3>
                <TextEditavel options={['acidente', 'doença', 'alergia']} label={''}></TextEditavel>
                <h3>Diagnóstico</h3>
                <TextEditavel options={['acidente', 'doença', 'alergia']} label={''}></TextEditavel>
                <h3>Comentários</h3>
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaInfoCircle /> Palavras-chave
                </h3>
            </div>
            <div>
                <PalavraChave label="trabalho" />
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
