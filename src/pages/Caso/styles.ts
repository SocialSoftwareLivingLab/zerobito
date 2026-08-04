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
    min-height: calc(
        100vh - 64px - 200px - 215px
    ); // 64px = navbar sistema, 215px = Jumbotron, 200px = navbar caso
`;
