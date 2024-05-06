import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PalavrasFormData, defaultValue } from './model';
import {
    EditPalavrasRequest,
    editPalavras
} from '../../../common/api/DossiePalavrasChave/edit-palavras-chave';
import { PalavrasDossieView, PalavrasDossieViewProps } from './view';

export function PalavrasDossieCard() {
    const { register, handleSubmit, reset, watch, setValue } = useForm<PalavrasFormData>({
        defaultValues: defaultValue
    });
    const palavrasChave = watch('palavrasChave');

    const handleCompleteEdit = useCallback(async (formData: PalavrasFormData) => {
        console.log(formData);

        const payload: EditPalavrasRequest = {
            palavrasChave: formData.palavrasChave
        };

        await editPalavras(payload);
    }, []);

    // TODO: Verificar a necessidade desse trecho
    // useEffect(() => {
    //     const data: DossieForm = {
    //         CausaPrimaria: formData.CausaPrimaria,
    //         CausaSecundaria: formData.CausaSecundaria,
    //         Diagnostico: formData.Diagnostico,
    //         Comentario: formData.Comentario
    //     };

    //     reset(data);A
    // }, [formData, reset]);

    const [dados, setDados] = useState(palavrasChave);
    const [inputValue, setInputValue] = useState('');
    function removePalavra(palavra: string) {
        setDados(dados.filter((e) => e !== palavra));
        setValue('palavrasChave', dados); // Filtra e atualiza a lista de palavras
        handleSubmit(handleCompleteEdit);
    }
    const [addPalavra, setAddPalavra] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmitInput = () => {
        if (inputValue.trim() !== '') {
            setDados([...dados, inputValue.trim()]); // Add input value to the 'dados' list
            setValue('palavrasChave', dados);
            setInputValue(''); // Clear input value after submission
            handleSubmit(handleCompleteEdit);
        }
    };

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            setAddPalavra(false);
            handleSubmitInput();
        }
    };

    const viewProps: PalavrasDossieViewProps = {
        palavrasChave,
        removePalavra,
        addPalavra,
        setAddPalavra,
        inputValue,
        handleInputChange,
        onEnterPress
    };

    return <PalavrasDossieView {...viewProps} />;
}
