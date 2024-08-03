import styled from 'styled-components';

export const ConvitePageContainer = styled.div`
    min-height: calc(100vh - 64px); // 64px é da navbar do sistema

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgb(172, 184, 196);
    background: linear-gradient(130deg, rgba(172, 184, 196, 1) 0%, rgba(2, 39, 79, 1) 100%);
`;

export const DadosConviteContainer = styled.div`
    width: 35%;
    background: #fff;

    min-height: 700px;
    border-radius: 16px;

    padding: 24px 100px;
`;
