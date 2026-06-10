import styled from 'styled-components';

export const MapaContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    .etapa-item {
        border-bottom: 1px solid #e2e8f0;
        background-color: #ffffff;
    }

    .etapa-cabecalho {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: 1rem 0.5rem;
        background-color: #ffffff;
    }

    .etapa-titulo {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-weight: 600;
    }

    .etapa-conteudo {
        background-color: #e2e8f0;
        padding: 1rem;
        border-top: 1px solid #cbd5e0;
    }

    .descricao-etapa {
        width: 100%;
        min-height: 80px;
        resize: vertical;
        border: 1px solid #cbd5e0;
        border-radius: 4px;
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
        color: #2d3748;
        background-color: #ffffff;
        margin-top: 0.5rem;
        margin-bottom: 0;
        box-sizing: border-box;

        &:focus {
            outline: none;
            border-color: #3182ce;
        }
    }

    .acoes-etapa {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        padding-top: 0.75rem;
    }

    .acoes-etapa label {
        color: #134780;
        font-weight: 600;
        font-size: 1.25rem;
    }

    .acoes-etapa select {
        border: 1px solid #cbd5e0;
        border-radius: 4px;
        padding: 0.4rem 0.75rem;
        font-size: 0.9rem;
        background-color: #ffffff;
        color: #2d3748;
        width: 180px;

        &:focus {
            outline: none;
            border-color: #3182ce;
        }
    }
`;
