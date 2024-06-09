import styled from 'styled-components';

export const CasoHeader = styled.section`
    position: relative;
    padding: 0 10% 24px;
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

export const CasoContent = styled.main`
    margin: 0 auto;
    margin-top: -25px;
    background-color: #f0f0f5;
    padding-top: 1px;
    padding: 0 10% 1rem;
    /* width: 100%; */
    min-height: 100%;
`;
