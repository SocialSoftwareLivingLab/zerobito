import styled from 'styled-components';

export const LocalizacaoCardContainer = styled.div`
    h3 {
        border-bottom: 1px solid #134780;
        padding-bottom: 15px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        svg:hover {
            cursor: pointer;
        }
    }

    .separador-localizacao {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
`;

export const Metadados = styled.div`
    margin-left: 16px;
    margin-top: 16px;
`;

export const Metadado = styled.div`
    margin-bottom: 16px;

    h4 {
        color: #134780;
        font-weight: bold;
        font-size: 20px;
    }

    span {
        font-size: 16px;
        margin-top: 8px;
    }
`;
