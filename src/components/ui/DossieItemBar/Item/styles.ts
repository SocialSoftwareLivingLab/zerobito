import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DossieItemNavegacaoContainer = styled(Link)`
    color: #134780;
    font-size: 1.4rem;
    font-weight: 600;
    font-family: Lato;
    border: 2px solid #f0f0f0;
    border-radius: 0.3em 0.3em 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 12rem;

    text-decoration: none;

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
`;
