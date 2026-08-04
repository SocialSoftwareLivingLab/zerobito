import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CasoNavegacaoItemContainer = styled(Link)<{ ativo: boolean }>`
    color: ${(props) => (props.ativo ? '#fff' : '#134780')};
    background-color: ${(props) => (props.ativo ? '#134780' : '#fff')};

    font-size: 16px;
    font-weight: 600;
    border-radius: 0.3em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    height: 100%;

    text-decoration: none;
    flex: 1 1 0;

    transition:
        background-color 0.1s,
        color 0.1s;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;
        svg {
            margin-top: 18px;
            font-size: 2rem;
            font-weight: 800;
        }
    }

    .circulo-icone {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #134780;
        border-radius: 50%;
        width: 2.2rem;
        height: 2.2rem;
        margin-top: 14px;
        svg {
            margin-top: 0;
            font-size: 1.4rem;
            color: #fff !important;
        }
    }

    &:not(:last-of-type) {
        margin-right: 28px;
    }

    &:hover {
        color: #fff;
        background-color: #134780;
    }
`;
