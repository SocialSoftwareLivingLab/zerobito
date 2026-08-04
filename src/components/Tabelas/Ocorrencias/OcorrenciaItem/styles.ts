import styled from 'styled-components';

export const OcorrenciaItemContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 8px 16px 0;

    font-size: 16px;

    span,
    strong {
        font-size: 14px;
    }
`;

export const SecaoItemOcorrencia = styled.div`
    h4 {
        margin-top: 8px;
        margin-bottom: 8px;
    }

    div.info {
        padding: 16px;
        border-left: 2px solid #e0e0e0;

        display: flex;
        flex-direction: column;

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
    }
`;
