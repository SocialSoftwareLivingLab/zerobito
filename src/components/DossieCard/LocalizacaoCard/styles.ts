import styled from 'styled-components';

export const LocalizacaoCardContainer = styled.div`
    height: 400px;

    h3 {
        border-bottom: 1px solid #134780;
        padding-bottom: 15px;
    }

    .separador-localizacao {
        height: 100%;
        display: flex;
        flex-direction: row;

        .leaflet-container {
            height: 100%;
            border-radius: 0.5rem;
            margin-top: 15px;
            width: 50%;
        }

        .leaflet-control-attribution {
            display: inline;
        }
    }
`;

export const Metadados = styled.div`
    margin-left: 16px;
`;

export const Metadado = styled.div`
    margin-top: 16px;

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
