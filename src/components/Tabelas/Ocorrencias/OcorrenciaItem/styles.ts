import styled from 'styled-components';

export const OcorrenciaItemContainer = styled.div`
    display: flex;
    flex-direction: column;

    span {
        display: block;

        &:not(:last-child) {
            margin-bottom: 8px;
        }
    }
`;

export const TabPanelContainer = styled.div`
    padding: 8px 16px;
`;
