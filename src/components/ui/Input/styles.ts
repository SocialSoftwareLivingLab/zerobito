import styled, { css } from "styled-components";
import { InputProps } from ".";

export const InputArea = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;

    margin: 16px;
`;

export type InputLabelProps = {
    required: boolean;
}


export const InputLabel = styled.label<InputLabelProps>`
    color: #141414;
    font-size: 16px;
    font-weight: bold;

    text-align: left;

    ${({ required }) => required && css`
        &::after {
            content: " *";
            color: #FF0000;
        }
    `}
`;

export type InputStyleProps = Pick<InputProps, 'width'>;

export const InputStyle = styled.input<InputStyleProps>`
    margin-top: 8px;

    display: block;

    border-radius: 0.5rem;
    border: 1px solid #ACB8C4;
    padding: 10px;
    font-size: 16px;
    height: 2.5em;

    width: ${({ width }) => width === 'auto' ? 'auto' : '100%'};

    &:focus {
        outline: none;
        box-shadow: 0px 0px 2px #6b8096;
        border-color: #6b8096;
    }

    &::placeholder {
        color: #ACB8C4;
    }    
`;