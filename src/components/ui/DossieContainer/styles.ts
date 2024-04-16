import styled from 'styled-components';

export const DossieContainerStyle = styled.div`
    width: 80%;
    max-width: calc(100% - 48px);
    background: #fff;

    margin: 0 auto; /* Added to horizontally center the container */
    margin-top: 3.5rem;
    height: 46.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 2rem;
    grid-auto-rows: minmax(33%, auto);
`;
