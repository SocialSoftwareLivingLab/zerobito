import styled from 'styled-components';

export const DossieCardStyle = styled.div`
    background: #fff;

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 16px;

        h2 {
            color: #134780;
            font-size: 32px;
            text-align: left;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        h3 {
            color: #134780;
            font-size: 23px;
            margin-top: 25px;

            svg {
                margin-right: 5px;
                margin-top: 5px;
            }
        }

        button {
            width: 150px;
            margin-top: 35px;
        }
    }

    .blue-line {
        padding-bottom: 15px;
        border-bottom: 1px solid #134780;
    }

    .row {
        display: flex;
        width: 0 auto;
        justify-content: space-between;
        flex-direction: row;
    }

    .column {
        width: 400px;
    }

    .Select {
        width: 250px;
    }
`;
