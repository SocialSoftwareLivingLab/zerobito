import styled from 'styled-components';

export const CasoHeader = styled.section`
    position: relative;
    padding: 0 10% 1rem;
    top: -25px;
    margin: 0 auto;

    &::before {
        content: '';
        position: absolute;
        top: 25px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #dadfea;
        z-index: -1;
    }
`;
