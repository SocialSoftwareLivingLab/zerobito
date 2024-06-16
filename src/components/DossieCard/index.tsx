import React from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Caso } from '../../common/models/caso/caso';
import { InfoGeralDossieCard } from './Info-Geral';
import { PalavrasDossieCard } from './palavrasChave';
import { DossieCardStyle } from './styles';
import { listarCausas } from '../../common/api/casos/listarCausas';
import LocalizacaoCard from './LocalizacaoCard';

interface DossieCardProps {
    data: Caso;
}
export function DossieCard({ data }: DossieCardProps) {
    const loadCausas = listarCausas();
    return (
        <DossieCardStyle>
            <header>
                <h2>Caso N&#xba; {String(data.id).padStart(5, '0')} </h2>
            </header>
            <div className="row">
                <div className="column">
                    <h3>Data de Denúncia</h3>
                    <span>
                        {Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(
                            new Date(data.dataCriacao)
                        )}
                    </span>
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
                <InfoGeralDossieCard caso={data} />
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaInfoCircle /> Palavras-chave
                </h3>
            </div>
            <div>
                <PalavrasDossieCard caso={data} />
            </div>
            <LocalizacaoCard />
            <div className="blue-line">
                <h3>
                    {' '}
                    <BsPaperclip /> Arquivos
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
