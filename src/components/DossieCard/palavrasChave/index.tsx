import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Caso } from '../../../common/models/caso/caso';
import { PalavrasFormData, defaultValue } from './model';
import { PalavrasDossieView, PalavrasDossieViewProps } from './view';

import { useQuery } from '@tanstack/react-query';
import { adicionarPalavraChave } from '../../../common/api/casos/palavras-chave/adicionar-palavra-chave';
import { buscarPalavrasChave } from '../../../common/api/casos/palavras-chave/buscar-palavras-chave';
import { removerPalavraChave } from '../../../common/api/casos/palavras-chave/remover-palavra-chave';
import { PalavraChaveCaso } from '../../../common/models/caso/palavra-chave';

export interface PalavrasDossieCardProps {
    caso: Caso;
}

export function PalavrasDossieCard({ caso }: PalavrasDossieCardProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['casos', 'palavras-chave', caso.id],
        queryFn: () => buscarPalavrasChave(caso.id)
    });

    const [palavras, setPalavras] = useState<PalavraChaveCaso[]>([]);
    const [isModoAdicionar, setIsModoAdicionar] = useState(false);

    const { register, handleSubmit, reset } = useForm<PalavrasFormData>({
        defaultValues: defaultValue
    });

    const onSalvarPalavra = useCallback(
        async (formData: PalavrasFormData) => {
            if (formData.palavra.trim() !== '') {
                const response = await adicionarPalavraChave(caso.id, formData.palavra);
                setPalavras((current) => [...current, response]);
                setIsModoAdicionar(false);
                reset({ palavra: '' });
            }
        },
        [caso, reset]
    );

    const handleRemoverPalavra = useCallback(
        async (idPalavra: number) => {
            await removerPalavraChave(caso.id, idPalavra);
            setPalavras((current) => current.filter((palavra) => palavra.id !== idPalavra));
        },
        [caso]
    );

    useEffect(() => {
        if (!isLoading) {
            setPalavras(data);
        }
    }, [isLoading, data]);

    const onEnterPress = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && e.shiftKey === false) {
                e.preventDefault();
                handleSubmit(onSalvarPalavra)();
            }
        },
        [handleSubmit, onSalvarPalavra]
    );

    const viewProps: PalavrasDossieViewProps = {
        palavras,
        isModoAdicionarPalavra: isModoAdicionar,
        setModoAdicionarPalavra: setIsModoAdicionar,
        excluirPalavra: handleRemoverPalavra,
        handleSubmit: handleSubmit(onSalvarPalavra),
        onEnterPress,
        register,
        reset
    };

    return <PalavrasDossieView {...viewProps} />;
}
