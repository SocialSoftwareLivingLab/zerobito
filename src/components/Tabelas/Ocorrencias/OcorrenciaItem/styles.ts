import styled from 'styled-components';

export const OcorrenciaItemContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 16px 24px 0;

    div.linha {
        display: flex;
        flex-direction: row;

        div * {
            display: block;
        }

        div + div {
            margin-left: 32px;
        }

        & + div.linha {
            margin-top: 16px;
        }
    }
`;

export const TabPanelContainer = styled.div`
    padding: 8px 16px;
`;
