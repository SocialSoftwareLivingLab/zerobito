import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createOcorrencia } from "../../common/models/ocorrencias/create.ocorrencia";

const useOcorrenciaViewModel = () => {
    const history = useHistory();
    const [error, setError] = useState<string>("");
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
            data: formData.passo1.data,
            nomeVitima: formData.passo2.nomeVitima,
            empresaEmpregadora: formData.passo2.empresaEmpregadora,
            // vinculo:formData.passo2.vinculo,
            denuncia: formData.passo2.descricao,
            // tipoOcorrencia:formData.passo3.tipoOcorrencia,
            // nomeContato:formData.passo3.nomeContato,
            // emailContato:formData.passo3.emailContato,
            // telefoneContato:formData.passo3.telefoneContato,
            condicaoAcidentado: formData.passo4.condicaoAcidentado,
            gravidade: formData.passo4.gravidade,
            status: formData.passo3.status,
            descricao: formData.passo2.denuncia,
            statusEvento: formData.passo4.statusEvento
        };
        //Quero que faça um post para a rota /ocorrencia/create e retorne para a tela de ocorrencia
        try {
            const response = await createOcorrencia(
                ocorrencia.denuncia,
                ocorrencia.data,
                ocorrencia.local,
                ocorrencia.nomeVitima,
                ocorrencia.condicaoAcidentado,
                ocorrencia.empresaEmpregadora,
                ocorrencia.gravidade,
                ocorrencia.statusEvento,

            );
            if (response.status === 200) {
                history.replace("/");
            }
        } catch (error: any) {
            setError(
                String(error.response.data?.error ?? error.response.data.message)
            );
        }
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

    const handleChangeCondicaoAcidentado = (value) => {
        // Atualiza a condição do acidentado
        setCondicaoAcidentado(value);
      
        // Se a condição do acidentado é "Com Óbito", define a gravidade para "Óbito"
        if (value === "Obito") {
          setGravidade("Óbito");
        }
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