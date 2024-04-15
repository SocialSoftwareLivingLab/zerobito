import styled from 'styled-components';

export const DossieContainerStyle = styled.div`
    width: 80%;
    max-width: calc(100% - 48px);
    background: #fff;

    padding: 5px;

    margin: 0 auto; /* Added to horizontally center the container */
    margin-top: 3.5rem;
    height: 46.5rem;

    header {
        display: flex;
        flex-direction:;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 16px;
    }
`;

export const DossieColumnStyle = styled.div`
    flex: 1; /* Faz com que as colunas ocupem o espaço disponível */
    margin-right: 16px; /* Define o espaçamento entre as colunas */
`;
