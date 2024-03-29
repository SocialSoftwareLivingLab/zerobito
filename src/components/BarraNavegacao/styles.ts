import styled from 'styled-components';

export const NavbarContainer = styled.div`
    height: 4em;
    padding: 0 10%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: lato;

    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

export const NavbarHomeContainer = styled.div`
    span {
        font-weight: bold;
        font-family: 'Nunito', sans-serif;
        font-size: 2.25rem;
    }

    span.Zer {
        color: rgba(172, 184, 196, 1);
    }

    span.Obito {
        color: rgba(2, 39, 79, 1);
    }
`;

export const NavbarAcoesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Links = styled.div`
    display: flex;
    flex-direction: row;
`;
