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
        text-align: center;
        justify-content: center;
        svg {
            margin-top: 18px;
            margin-left: 40%;
            font-size: 2rem;
            font-weight: 800;
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
