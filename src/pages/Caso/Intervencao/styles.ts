import styled from 'styled-components';

export const IntervencaoContainer = styled.div`
    padding-top: 24px;

    > div:nth-child(n + 2) {
        margin-top: 24px;
    }

    .blue-line {
        padding-bottom: 15px;
        border-bottom: 1px solid #134780;
        margin-bottom: 20px;
    }

    h3 {
        color: #134780;
        font-size: 23px;

        svg {
            margin-right: 5px;
            margin-top: 5px;
        }
    }
    .column {
        display: flex;
        width: 50%;
        flex-direction: column;
    }
    .row {
        display: flex;
        width: 0 auto;
        justify-content: space-between;
        flex-direction: row;
        gap: 18px;
    }
    .rowInput {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-end;
        gap: 10px; /* Espaço pequeno entre os campos */
    }

    .rowInput Input {
        width: 150px;
    }

    .rowInput Button {
        margin-top: 25px;
        padding: 8px 16px; /* Ajusta o preenchimento para um tamanho adequado */
        margin-left: auto;
    }

    .botao-salvar {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }

    .calendario-tarefas {
        background: #fff;
        padding: 24px;

        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        display: flex;
        gap: 32px;
        align-items: flex-start;
    }

    .space {
        margin-bottom: 20px;
    }

    /* Lista de Tarefas */
    .lista-tarefas {
        width: 55%;
    }

    .lista-tarefas h3 {
        margin-bottom: 25px;
        padding-top: 12px;
        font-size: 23px;
        color: #134780;
    }

    .card-tarefa {
        background-color: #134780;
        color: white;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .card-tarefa strong {
        font-size: 14px;
    }

    .card-tarefa div {
        font-size: 12px;
    }

    /* Status */
    .status {
        font-size: 12px;
        font-weight: bold;
        padding-left: 8px;
    }

    .status.realizada {
        color: #00c853; /* verde */
    }

    .status.em-andamento {
        color: #ffab00; /* laranja */
    }

    .status.atrasado {
        color: red;
    }
`;
