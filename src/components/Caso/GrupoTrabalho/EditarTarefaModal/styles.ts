import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;

    .titulo {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .acoes {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        select {
            min-width: 150px;
        }
    }
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .status-conclusao {
        margin-top: 0.5rem;

        label {
            font-weight: 500;
            display: block;
            margin-bottom: 0.5rem;
        }

        .radio-group {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;

            label {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.95rem;
            }
        }
    }
`;

export const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

export const StatusConclusao = styled.div`
    padding-left: 16px; /* leve recuo à esquerda */

    .radio-group {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px; /* espaçamento vertical entre as opções */
    }
`;
