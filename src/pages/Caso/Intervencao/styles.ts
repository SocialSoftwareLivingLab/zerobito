import styled from 'styled-components';

export const IntervencaoContainer = styled.section`
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .tabela-intervencoes {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;

        th {
            text-align: left;
            padding: 0.5rem 0.75rem;
            background-color: #f1f5f9;
            color: #475569;
            font-weight: 600;
            border-bottom: 1px solid #cbd5e0;
        }

        td {
            padding: 0.5rem 0.75rem;
            border-bottom: 1px solid #e2e8f0;
            color: #2d3748;
        }

        tr:last-child td {
            border-bottom: none;
        }

        .tr-autor td {
            font-weight: 700;
            color: #134780;
            font-size: 0.95rem;
            padding: 0.75rem 0.75rem 0.25rem;
            background: transparent;
            border-bottom: 2px solid #e2e8f0;
        }

        .tr-autor:not(:first-child) td {
            padding-top: 1.5rem;
        }
    }

    .calendario-intervencoes {
        display: flex;
        gap: 32px;
        align-items: flex-start;
    }

    .lista-intervencoes {
        width: 55%;
    }

    .lista-intervencoes h3 {
        margin-bottom: 25px;
        padding-top: 12px;
        font-size: 23px;
        color: #134780;
    }

    .card-intervencao {
        background-color: #134780;
        color: white;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        strong {
            font-size: 14px;
        }

        div {
            font-size: 12px;
        }
    }

    .btn-editar {
        background: none;
        border: none;
        cursor: pointer;
        color: #134780;
        font-size: 0.9rem;
        padding: 0.25rem;

        &:hover {
            color: #1e63b5;
        }
    }
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: 600px;

    .form-row {
        display: flex;
        gap: 1rem;
        align-items: flex-start;

        > * {
            flex: 1;
        }
    }

    .form-acoes {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 0.5rem;
    }
`;
