import styled from "styled-components";
import { ButtonProps } from ".";

interface ButtonColorTypes {
    [key: string]: {
        color: string,
        hover: string, 
        disabled: string
    }
}

const buttonSizes: {[key: string]: string} = {
    'small': '14px',
    'medium': '16px',
    'large': '18px'
}

const buttonColors: ButtonColorTypes = {
    'button': {
        color: '#134780',
        hover: '#0D2C4C',
        disabled: '#D3D3D3'
    },
    'submit': {
        color: '#00AA00',
        hover: '#0D2C4C',
        disabled: '#D3D3D3'
    },
    'cancel': {
        color: '#CC0000',
        hover: '#FF0000',
        disabled: '#D3D3D3'
    }
}

export interface ButtonStyleProps {
    size: 'small' | 'medium' | 'large',
    type: 'button' | 'submit' | 'cancel'
}

export const ButtonStyle = styled.button<ButtonStyleProps>`
    border-radius: 0.2rem;
    width: auto;
    font-size: ${props => buttonSizes[props.size]};
    height: 2.3rem;
    background-color: ${props => buttonColors[props.type].color};
    margin: 0;

    padding: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s ease;

    &:hover{
        background-color: ${props => buttonColors[props.type].hover};
    }

    &:disabled {
        background-color: ${props => buttonColors[props.type].disabled};
    }
`;