import styled, { css } from 'styled-components';

interface ButtonColorTypes {
    [key: string]: {
        background: string;
        hover: string;
        text: string;
    };
}

const buttonSizes: { [key: string]: string } = {
    small: '14px',
    medium: '16px',
    large: '18px'
};

export const buttonColors: ButtonColorTypes = {
    button: {
        background: '#134780',
        hover: '#0c2b4d',
        text: '#fff'
    },
    submit: {
        background: '#00AA00',
        hover: '#009000',
        text: '#fff'
    },
    cancel: {
        background: '#CC0000',
        hover: '#FF0000',
        text: '#fff'
    },
    default: {
        background: '#fff',
        hover: '#eee',
        text: '#acb8c4'
    }
};

export interface ButtonStyleProps {
    size: 'small' | 'medium' | 'large';
    type: 'button' | 'submit' | 'cancel' | 'default';
}

export const ButtonStyle = styled.button<ButtonStyleProps>`
    border-radius: 0.2rem;
    border: none;
    width: auto;
    font-size: ${(props) => buttonSizes[props.size]};
    height: 2.3rem;
    background-color: ${(props) => buttonColors[props.type].background};
    margin: 0;

    padding: 16px;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 4px;

    transition: background-color 0.2s ease;

    color: ${(props) => buttonColors[props.type].text};

    &:hover {
        background-color: ${(props) => buttonColors[props.type].hover};
    }

    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.4;
        `}

    ${(props) =>
        props.type === 'default' &&
        css`
            border: 2px solid #acb8c4;
        `}
`;
