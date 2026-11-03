import styled from 'styled-components';

export const StatusContainer = styled.div`
    width: calc(100% - 48px);
    background: #fff;
    padding: 16px 24px;
    border: 1px solid #f0f0f0;
    border-radius: 0.3em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;

    .status-titulo {
        color: #134780;
        font-weight: 600;
        font-size: 0.95rem;
        white-space: nowrap;
    }

    .status-etapas {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .status-etapa {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: #94a3b8;
    }

    .status-etapa + .status-etapa::before {
        content: '';
        display: block;
        width: 40px;
        height: 2px;
        margin: 0 12px;
        background: #cbd5e0;
    }

    .status-marcador {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #cbd5e0;
        background: #fff;
        font-size: 0.75rem;
        font-weight: 700;
    }

    .status-etapa.concluida {
        color: #2d3748;

        .status-marcador {
            border-color: #28a745;
            background: #28a745;
            color: #fff;
        }
    }

    .status-etapa.concluida + .status-etapa::before {
        background: #28a745;
    }

    .status-etapa.atual {
        color: #134780;
        font-weight: 700;

        .status-marcador {
            border-color: #134780;
            background: #134780;
            color: #fff;
        }
    }

    .status-descricao {
        margin-left: auto;
        color: #475569;
        font-size: 0.85rem;
    }
`;
