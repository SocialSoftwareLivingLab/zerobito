import styled from 'styled-components';

export const TextEditavelContainer = styled.fieldset`
    border: none;
    .column {
        display: flex;
        width: 50%;
        flex-direction: column;
        padding: 0px;
    }
    div {
        display: flex;
        flex-direction: row;
        font-size: 20px;
        padding: 10px;
        svg {
            margin-left: 10px;
            margin-top: 7px;
            font-size: 15px;
        }
    }
`;
