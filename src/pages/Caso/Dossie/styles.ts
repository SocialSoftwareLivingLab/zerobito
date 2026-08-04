import styled from 'styled-components';

export const DossieContainer = styled.div`
    padding-top: 24px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0 2rem;

    .semFundo {
        background-color: transparent;
        box-shadow: none;
        padding: 0px;
    }

    .calendario-tarefas {
        background: #fff;
        padding: 24px;

        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        margin-top: 25px;
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
