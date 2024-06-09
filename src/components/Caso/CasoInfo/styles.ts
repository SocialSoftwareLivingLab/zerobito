import styled from 'styled-components';

export const CasoInfoContainer = styled.div`
    /* width: calc(80% - 48px);
    max-width: calc(100% - 48px); */
    background: #fff;

    padding: 5px 24px;
    border: 2px solid #f0f0f0;
    border-radius: 0.3em 0.3em 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    margin: 0 auto; /* Added to horizontally center the container */
    /* margin-top: -25px; */
    height: 2.5rem;

    header {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.1rem;
        h2 {
            color: #134780;
            font-size: 23px;
            text-align: left;
        }

        span {
            padding-right: 5rem;
            padding-top: 15px;
            height: 80%;
            text-align: left;
            margin-left: 8px;
            margin-right: 5rem;
            border-right: 1px solid grey;
        }

        label {
            height: 80%;
            color: #134780;
            padding-top: 15px;
            text-align: left;
            margin-right: 2px;
        }
    }
`;
