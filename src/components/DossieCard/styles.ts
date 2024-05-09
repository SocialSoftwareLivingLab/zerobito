import styled from 'styled-components';

export const DossieCardStyle = styled.div`
    background: #fff;

    header {
        display: flex;
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
            margin-top: 27px;
        }
    }

    input {
        display: flex;
        border-radius: 0.5rem;
        border: 1px solid #acb8c4;
        font-size: 16px;
        height: 1rem;
        margin-top: 25px;
        margin-left: 4px;
        margin-right: 20px;

        width: auto;

        &:focus {
            outline: none;
            box-shadow: 0px 0px 2px #6b8096;
            border-color: #6b8096;
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
        width: auto;
    }
    .chave {
        span {
            margin-top: 0px;
        }
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;

        button {
            margin-top: 25px;
        }
        input {
            display: flex;
            border-radius: 0.5rem;
            border: 1px solid #acb8c4;
            font-size: 16px;
            height: 1rem;
            margin-top: 25px;
            margin-left: 4px;
            margin-right: 20px;
            height: 30px;

            width: auto;

            &:focus {
                outline: none;
                box-shadow: 0px 0px 2px #6b8096;
                border-color: #6b8096;
            }
        }
    }
    span {
        margin-top: 10px;
    }
    .add {
        margin-top: 0px;
        width: fit-content;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        color: #134780;
        font-size: 17px;
        font-weight: 550;
        margin-left: 20px;

        svg {
            margin-top: 7px;
            font-size: 20px;
            cursor: pointer;
        }
    }
`;
