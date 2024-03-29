import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ItemNavegacaoContainer = styled(Link)`
    color: #134780;
    font-size: 1.2rem;
    font-family: Lato;

    text-decoration: none;

    div {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        svg {
            font-weight: 600;
            margin-right: 8px;
        }
    }

    &:not(:last-of-type) {
        margin-right: 28px;
    }
`;
