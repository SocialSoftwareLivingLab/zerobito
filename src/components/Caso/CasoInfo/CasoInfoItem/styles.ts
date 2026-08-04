import styled from 'styled-components';

export const CasoInfoItemContainer = styled.div`
    padding: 12px 24px;

    display: flex;
    color: #134780;

    &:not(:last-child) {
        border-right: 1px solid #acb8c4;
    }

    strong {
        margin-left: 12px;
    }

    span {
        margin-left: 4px;
        color: initial;
    }
`;
