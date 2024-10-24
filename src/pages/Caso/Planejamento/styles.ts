import styled from 'styled-components';

export const PlanejamentoContainer = styled.div`
    padding-top: 24px;

    > div:nth-child(n + 2) {
        margin-top: 24px;
    }

    .blue-line {
        padding-bottom: 15px;
        border-bottom: 1px solid #134780;
    }

    h3 {
        color: #134780;
        font-size: 23px;

        svg {
            margin-right: 5px;
            margin-top: 5px;
        }
    }
    .column {
        display: flex;
        width: 50%;
        flex-direction: column;
    }
    .row {
        display: flex;
        width: 0 auto;
        justify-content: space-between;
        flex-direction: row;
        gap: 18px;
    }
`;
