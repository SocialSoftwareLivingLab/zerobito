import styled from 'styled-components';

export const BoxContainerStyle = styled.div`
    width: calc(100% - 48px);
    max-width: calc(100% - 48px);
    background: #fff;

    padding: 24px;
    /* padding-top: 48px; */
    border: 1px solid #f0f0f0;
    border-radius: 0.3em 0.3em 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 16px;

        h2 {
            color: #134780;
            font-size: 23px;
            text-align: left;
        }
    }
`;
