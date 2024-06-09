import styled from 'styled-components';

export const DossieBarContainerStyle = styled.div`
    width: 80%;
    max-width: calc(100% - 48px);
    background: #dadfea;

    margin: 0 auto; /* Added to horizontally center the container */
    margin-top: 2rem;
    height: 6rem;

    header {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 3rem;
    }
`;
