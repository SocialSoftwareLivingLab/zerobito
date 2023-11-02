import api from "../../common/api";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useOcorrenciaViewModel = () => {
    const history = useHistory();
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

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const ocorrencia = {
            denuncia,
            data,
            gerarEndereco,
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
        };
        const response = await api.post("/ocorrencia", ocorrencia);
        history.push("/");
        return response;
    };

    const handleChangeDenuncia = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setDenuncia(value);
    };

    const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setData(value);
    };

    const handleChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setLocal(value);
    };

    const handleChangeEstado = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.value);
    };

    const handleChangeCidade = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCidade(event.target.value);
    };

    const handleChangeReferenciaLocalidade = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReferenciaLocalidade(event.target.value);
    };

    const gerarEndereco = () => {
        return `${estado}, ${cidade}, ${local}, ${referenciaLocalidade}`;
    };

    const handleChangeNomeVitima = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setNomeVitima(value);
    };

    const handleChangeCondicaoAcidentado = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setCondicaoAcidentado(value);
    };

    const handleChangeGravidade = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setGravidade(value);
    };

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setStatus(value);
    };

    const handleChangeVinculo = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleChangeTipoOcorrencia = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        endereco: gerarEndereco(),
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