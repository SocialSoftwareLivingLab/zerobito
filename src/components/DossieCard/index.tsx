import React, { useCallback, useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { FaFileAlt, FaInfoCircle, FaEdit } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Caso } from '../../common/models/caso/caso';
import { InfoGeralDossieCard } from './Info-Geral';
import { PalavrasDossieCard } from './palavrasChave';
import { DossieCardStyle } from './styles';
import { listarCausas } from '../../common/api/casos/listarCausas';
import LocalizacaoCard from './LocalizacaoCard';
import Input from '../ui/Input';
import { Button } from '../ui/Button';
import { useForm } from 'react-hook-form';
import { editDataObito } from '../../common/api/casos/datas-dossie/alterar-data-obito';
import { editData } from '../../common/api/casos/datas-dossie/alterar-data';

interface DossieCardProps {
    caso: Caso;
}

export interface DataObitoFormField {
    dataObito: Date;
    data: Date;
}

export function DossieCard({ caso }: DossieCardProps) {
    const { register, watch, setValue, handleSubmit } = useForm<DataObitoFormField>({
        defaultValues: {
            dataObito: caso.dataObito,
            data: caso.dataCaso
        }
    });

    const dataObitoSelecionada = watch('dataObito');
    const dataSelecionada = watch('data');

    const [isEditingDataObito, setIsEditingDataObito] = useState(false);
    const [isEditingData, setIsEditingData] = useState(false);

    const [dataObito, setDataObito] = useState(caso.dataObito);
    const [data, setData] = useState(caso.dataCaso);

    const [errorObito, setErrorObito] = useState<string | null>(null);
    const [errorData, setErrorData] = useState<string | null>(null);

    const handleEditDataObitoClick = () => {
        setIsEditingDataObito(true);
    };

    const handleCancelDataObitoClick = () => {
        setErrorObito(null);
        setIsEditingDataObito(false);
    };

    const handleCompleteEditDataObito = useCallback(
        async (formData: DataObitoFormField) => {
            if (formData.data && formData.dataObito && formData.data > formData.dataObito) {
                setErrorObito('A data de acidente deve ser menor ou igual à data de óbito.');
                return;
            }

            const payload = formData.dataObito;
            setIsEditingDataObito(false);
            setDataObito(payload);
            await editDataObito(payload, caso.id);
        },
        [caso.id]
    );

    const handleEditDataClick = () => {
        setIsEditingData(true);
    };

    const handleCancelDataClick = () => {
        setErrorData(null);
        setIsEditingData(false);
    };

    const handleCompleteEditData = useCallback(
        async (formData: DataObitoFormField) => {
            if (formData.data && formData.dataObito && formData.data > formData.dataObito) {
                setErrorData('A data de acidente deve ser menor ou igual à data de óbito.');
                return;
            }

            const payload = formData.data;
            setErrorData(null);
            setIsEditingData(false);
            setData(payload);
            await editData(payload, caso.id);
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
                    <h3 onClick={handleEditDataObitoClick} style={{ cursor: 'pointer' }}>
                        Data de Óbito{' '}
                        <FaEdit
                            style={{ cursor: 'pointer', fontSize: '18px' }}
                            onClick={handleEditDataObitoClick}
                        />
                    </h3>
                    <form onSubmit={handleSubmit(handleCompleteEditDataObito)}>
                        {isEditingDataObito ? (
                            <>
                                <Input
                                    label={''}
                                    type="date"
                                    {...register('dataObito', { required: true })}
                                />
                                {errorObito && <p style={{ color: 'red' }}>{errorObito}</p>}
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

                    <h3 onClick={handleEditDataClick} style={{ cursor: 'pointer' }}>
                        Data do Acidente{' '}
                        <FaEdit
                            style={{ cursor: 'pointer', fontSize: '18px' }}
                            onClick={handleEditDataClick}
                        />
                    </h3>
                    <form onSubmit={handleSubmit(handleCompleteEditData)}>
                        {isEditingData ? (
                            <>
                                <Input
                                    label={''}
                                    type="date"
                                    {...register('data', { required: true })}
                                />
                                {errorData && <p style={{ color: 'red' }}>{errorData}</p>}
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
                            dataSelecionada && (
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
