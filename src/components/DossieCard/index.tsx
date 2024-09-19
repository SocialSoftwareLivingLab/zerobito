import React, { useCallback, useEffect, useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Caso } from '../../common/models/caso/caso';
import { InfoGeralDossieCard } from './Info-Geral';
import { PalavrasDossieCard } from './palavrasChave';
import { DossieCardStyle } from './styles';
import { listarCausas } from '../../common/api/casos/listarCausas';
import LocalizacaoCard from './LocalizacaoCard';
import Input from '../ui/Input';
import { Button } from '../ui/Button';
import { Form, useForm } from 'react-hook-form';
import { editDataObito } from '../../common/api/casos/datas-dossie/alterar-data-obito';
import { editData } from '../../common/api/casos/datas-dossie/alterar-data';

interface DossieCardProps {
    caso: Caso;
}

export interface DataObitoFormField {
    dataObito: Date;
    data: Date;
}

export interface AlterarLocalizacaoCasoFormProps {
    dataObito: Date;
    handleSubmit: (data: DataObitoFormField, e?: unknown) => void;
}

export function DossieCard({ caso }: DossieCardProps) {
    const { register, watch, setValue, handleSubmit } = useForm<DataObitoFormField>({
        defaultValues: {
            dataObito: caso.dataObito,
            data: caso.dataCaso
        }
    });
    const loadCausas = listarCausas();
    const dataObitoSelecionada = watch('dataObito');
    const [isEditingDataObito, setIsEditingDataObito] = useState(false);
    const [dataObito, setDataObito] = useState(caso.dataObito);
    const handleEditDataObitoClick = () => {
        setIsEditingDataObito(true);
    };
    const handleCancelDataObitoClick = () => {
        setIsEditingDataObito(false);
    };
    const handleCompleteEditDataObito = useCallback(
        async (formData: DataObitoFormField) => {
            const payload = formData.dataObito;
            setIsEditingDataObito(false);
            setDataObito(payload);
            console.log(payload);
            const response = await editDataObito(payload, caso.id);
            console.log('terminouuu');
            console.log(response);
        },
        [caso.id]
    );

    const dataSelecionada = watch('data');
    const [isEditingData, setIsEditingData] = useState(false);
    const [data, setData] = useState(caso.dataObito);
    const handleEditDataClick = () => {
        setIsEditingData(true);
    };
    const handleCancelDataClick = () => {
        setIsEditingDataObito(false);
    };
    const handleCompleteEditData = useCallback(
        async (formData: DataObitoFormField) => {
            const payload = formData.data;
            setIsEditingData(false);
            setData(payload);
            console.log(payload);
            const response = await editData(payload, caso.id);
            console.log('terminouuu');
            console.log(response);
        },
        [caso.id]
    );

    return (
        <DossieCardStyle>
            <header>
                <h2>Caso N&#xba; {String(caso.id).padStart(5, '0')} </h2>
            </header>
            <div className="row">
                <div className="column">
                    <h3 onClick={handleEditDataObitoClick}>Data de Óbito</h3>
                    <form onSubmit={handleSubmit(handleCompleteEditDataObito)}>
                        {isEditingDataObito ? (
                            <>
                                <Input
                                    label={''}
                                    type="date"
                                    {...register('dataObito', { required: true })}
                                />
                                <div className="row">
                                    <Button size="small" type="submit">
                                        Salvar
                                    </Button>
                                    <Button
                                        size="small"
                                        type="cancel"
                                        action={handleCancelDataObitoClick}>
                                        Fechar
                                    </Button>
                                </div>
                            </>
                        ) : (
                            dataObitoSelecionada && (
                                <span onClick={handleEditDataObitoClick}>
                                    {Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(
                                        new Date(dataObito)
                                    )}
                                </span>
                            )
                        )}
                    </form>
                    <h3 onClick={handleEditDataClick}>Data de Acidente</h3>
                    <form onSubmit={handleSubmit(handleCompleteEditData)}>
                        {isEditingData ? (
                            <>
                                <Input
                                    label={''}
                                    type="date"
                                    {...register('data', { required: true })}
                                />
                                <div className="row">
                                    <Button size="small" type="submit">
                                        Salvar
                                    </Button>
                                    <Button
                                        size="small"
                                        type="cancel"
                                        action={handleCancelDataClick}>
                                        Fechar
                                    </Button>
                                </div>
                            </>
                        ) : (
                            dataObitoSelecionada && (
                                <span onClick={handleEditDataClick}>
                                    {Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(
                                        new Date(data)
                                    )}
                                </span>
                            )
                        )}
                    </form>
                </div>
                <div className="column">
                    <h3>Status de notificação obrigatória</h3>
                    <span>{caso[2]}</span>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <h3>Atores Convidados</h3>
                    <span>{caso[3]} Atores</span>
                </div>

                <div className="column">
                    <h3>Próxima Reunião</h3>
                    <span>{caso[4]}</span>
                </div>
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaInfoCircle /> Informações Gerais
                </h3>
            </div>
            <div>
                <InfoGeralDossieCard caso={caso} />
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaInfoCircle /> Palavras-chave
                </h3>
            </div>
            <div>
                <PalavrasDossieCard caso={caso} />
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
