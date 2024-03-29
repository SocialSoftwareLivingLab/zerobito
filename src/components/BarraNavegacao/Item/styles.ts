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
            margin-right: 4px;
        }
    }

    &:not(:last-of-type) {
        margin-right: 24px;
    }
`;
