import styled from 'styled-components';

export const TextEditavelContainer = styled.fieldset`
    border: none;
    .column {
        display: flex;
        width: 50%;
        flex-direction: column;
        padding-top: 10px;
    }
    div {
        display: flex;
        font-size: 20px;
        svg {
            margin-left: 10px;
            margin-top: 7px;
            font-size: 15px;
        }
    }
    .Select {
        width: 100%;
    }
`;
