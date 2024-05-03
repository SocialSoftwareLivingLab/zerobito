import React, { useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { IoMdAddCircle } from 'react-icons/io';
import { FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { DossieCardStyle } from './styles';
import { InfoGeralDossieCard } from './Info-Geral';
import PalavraChave from '../ui/PalavraChave';
import { Button } from '../ui/Button';

interface DossieCardProps {
    data: string[];
    palavras: string[];
}

interface InputValue {
    inputValue: string;
}

export function DossieCard({ data, palavras }: DossieCardProps) {
    const [dados, setDados] = useState(palavras);
    const [inputValue, setInputValue] = useState('');
    function removePalavra(palavra: string) {
        setDados(dados.filter((e) => e !== palavra)); // Filtra e atualiza a lista de palavras
    }
    const [addPalavra, setAddPalavra] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmitInput = () => {
        if (inputValue.trim() !== '') {
            setDados([...dados, inputValue.trim()]); // Add input value to the 'dados' list
            setInputValue(''); // Clear input value after submission
        }
    };

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            setAddPalavra(false);
            handleSubmitInput();
        }
    };

    return (
        <DossieCardStyle>
            <header>
                <h2>Caso N {data[0]} </h2>
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
                <InfoGeralDossieCard />
            </div>
            <div className="blue-line">
                <h3>
                    {' '}
                    <FaInfoCircle /> Palavras-chave
                </h3>
            </div>
            <div className="chave">
                {dados.map((palavra) => (
                    // eslint-disable-next-line react/jsx-key
                    <PalavraChave label={palavra} removeHandle={() => removePalavra(palavra)} />
                ))}
                <div className="add">
                    <IoMdAddCircle onClick={() => setAddPalavra(true)} />
                </div>
                {addPalavra && (
                    <form className="row">
                        <input
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={onEnterPress}
                        />
                    </form>
                )}
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
