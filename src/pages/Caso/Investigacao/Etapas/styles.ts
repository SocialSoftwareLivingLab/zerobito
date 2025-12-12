import styled from 'styled-components';

export const MapaContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    > div {
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 1.25rem;
        background-color: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        transition:
            box-shadow 0.2s ease,
            transform 0.2s ease;

        &:hover {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.07);
            transform: translateY(-1px);
        }
    }

    .descricao-etapa {
        width: 98%;
        min-height: 80px;
        resize: vertical;
        border: 1px solid #cbd5e0;
        border-radius: 8px;
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
        color: #2d3748;
        background-color: #f8fafc;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        transition: border-color 0.2s ease;

        &:focus {
            outline: none;
            border-color: #3182ce;
            background-color: #ffffff;
        }
    }

    .acoes-etapa {
        display: flex;
        align-items: center;
        justify-content: flex-end; /* tudo à direita */
        gap: 1rem; /* espaço entre o select e o botão */
    }

    /* Agrupa label + select lado a lado */
    .acoes-etapa .select-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .acoes-etapa label {
        color: #2b6bb0cb;
        font-weight: 700;
        font-size: 1.3rem;
        text-shadow: 0 0 1px rgba(2, 39, 79, 1);
    }

    /* Label azul escura e negrito */
    .acoes-etapa .select-wrapper label {
        color: #2b6bb0cb;
        font-weight: 700;
        font-size: 1.3rem;
        text-shadow: 0 0 1px #2b6bb0cb;
    }

    /* Select box estilizado */
    .acoes-etapa select {
        border: 1px solid #cbd5e0;
        border-radius: 6px;
        padding: 0.4rem 0.75rem;
        font-size: 0.9rem;
        background-color: #f8fafc;
        color: #2d3748;
        width: 180px;
        transition: border-color 0.2s ease;
    }

    .acoes-etapa select:focus {
        outline: none;
        border-color: #3182ce;
    }

    /* Botão alinhado à direita */
    .acoes-etapa button {
        margin-left: 1rem;
    }

    .acoes-etapa button {
        color: #fff;
        font-weight: 500;
        border: none;
        border-radius: 6px;
        padding: 0.4rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:disabled {
            background-color: #a0aec0;
            cursor: not-allowed;
        }
    }
`;
