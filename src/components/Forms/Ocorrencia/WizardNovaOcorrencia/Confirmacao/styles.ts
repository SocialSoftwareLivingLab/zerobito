import styled from 'styled-components';

export const Section = styled.section`
    text-align: left;

    margin-top: 16px;

    h3 {
        font-size: 20px;
        font-weight: bold;
        color: #141414;
        padding-bottom: 4px;
    }

    & > :not(h3) {
        padding-top: 8px;
        padding-left: 8px;
        border-left: 2px solid #e0e0e0;
    }

    p.justificado {
        text-align: justify;
    }
`;
