import { useState } from "react";

const useOcorrenciaViewModel = () => {
    const [denuncia, setDenuncia] = useState<string>("");
    const [data, setData] = useState('');
    const [estado, setEstado] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [referenciaLocalidade, setReferenciaLocalidade] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [nomeVitima, setNomeVitima] = useState<string>("");
    const [condicaoAcidentado, setCondicaoAcidentado] = useState<string>("");
    const [gravidade, setGravidade] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [vinculo, setVinculo] = useState<string>("");
    const [empresaEmpregadora, setEmpresaEmpregadora] = useState<string>("");
    const [empresaTomadora, setEmpresaTomadora] = useState<string>("");
    const [tipoOcorrencia, setTipoOcorrencia] = useState<string>("");
    const [nomeContato, setNomeContato] = useState<string>("");
    const [emailContato, setEmailContato] = useState<string>("");
    const [telefoneContato, setTelefoneContato] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
   

    const handleSubmit = async (formData) => {
        
        const ocorrencia = {
            local: (formData.passo1.estado + formData.passo1.local + formData.passo1.referenciaLocalidade + formData.passo1.cidade),
            data:formData.passo1.data,
            nomeVitima:formData.passo2.nomeVitima,
            empresaEmpregadora:formData.passo2.empresaEmpregadora,
            vinculo:formData.passo2.vinculo,
            denuncia: formData.passo2.descricao,
            tipoOcorrencia:formData.passo3.tipoOcorrencia,
            nomeContato:formData.passo3.nomeContato,
            emailContato:formData.passo3.emailContato,
            telefoneContato:formData.passo3.telefoneContato,
            condicaoAcidentado:formData.passo4.condicaoAcidentado,
            gravidade:formData.passo5.gravidade,
            status:formData.passo3.status,
            empresaTomadora:formData.passo3.empresaTomadora,
            descricao:formData.passo5.descricao,
        };
        
        return console.log(ocorrencia);
    };

    const handleChangeDenuncia = (event) => {
        const value = event.target.value;

        setDenuncia(value);
    };

    const handleChangeData = (event) => {
        const value = event.target.value;

        setData(value);
    };

    const handleChangeLocal = (event) => {
        const value = event.target.value;

        setLocal(value);
    };

    const handleChangeEstado = (event) => {
        setEstado(event.target.value);
    };

    const handleChangeCidade = (event) => {
        setCidade(event.target.value);
    };

    const handleChangeReferenciaLocalidade = (event) => {
        setReferenciaLocalidade(event.target.value);
    };

    const handleChangeNomeVitima = (event) => {
        const value = event.target.value;

        setNomeVitima(value);
    };

    const handleChangeCondicaoAcidentado = (event) => {
        const value = event.target.value;

        setCondicaoAcidentado(value);
    };

    const handleChangeGravidade = (event) => {
        const value = event.target.value;

        setGravidade(value);
    };

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setStatus(value);
    };

    const handleChangeVinculo = (event) => {
        const value = event.target.value;

        setVinculo(value);
    };

    const handleChangeEmpresaEmpregadora = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setEmpresaEmpregadora(value);
    };

    const handleChangeEmpresaTomadora = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setEmpresaTomadora(value);
    };

    const handleChangeTipoOcorrencia = (event) => {
        const value = event.target.value;

        setTipoOcorrencia(value);
    };

    const handleChangeNomeContato = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setNomeContato(value);
    }

    const handleChangeEmailContato = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setEmailContato(value);
    }

    const handleChangeTelefoneContato = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setTelefoneContato(value);
    }

    const handleChangeDescricao = (event) => {
        const value = event.target.value;

        setDescricao(value);
    };

    return {
        denuncia,
        data,
        local,
        estado,
        cidade,
        referenciaLocalidade,
        nomeVitima,
        condicaoAcidentado,
        gravidade,
        status,
        vinculo,
        empresaEmpregadora,
        empresaTomadora,
        tipoOcorrencia,
        nomeContato,
        emailContato,
        telefoneContato,
        descricao,
        handleSubmit,
        handleChangeDenuncia,
        handleChangeData,
        handleChangeEstado,
        handleChangeCidade,
        handleChangeLocal,
        handleChangeReferenciaLocalidade,
        handleChangeNomeVitima,
        handleChangeCondicaoAcidentado,
        handleChangeGravidade,
        handleChangeStatus,
        handleChangeVinculo,
        handleChangeEmpresaEmpregadora,
        handleChangeEmpresaTomadora,
        handleChangeTipoOcorrencia,
        handleChangeNomeContato,
        handleChangeEmailContato,
        handleChangeTelefoneContato,
        handleChangeDescricao,
    };
};

export default useOcorrenciaViewModel;