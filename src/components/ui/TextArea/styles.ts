import styled, { css } from 'styled-components';
import { TextAreaProps } from '.';

export const TextAreaContainer = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;

    margin: 16px;
`;

export type TextAreaLabelProps = {
    required: boolean;
};

export const TextAreaLabel = styled.label<TextAreaLabelProps>`
    color: #141414;
    font-size: 16px;
    font-weight: bold;

    text-align: left;

    ${({ required }) =>
        required &&
        css`
            &::after {
                content: ' *';
                color: #ff0000;
            }
        `}
`;

export type TextAreaStyleProps = Pick<TextAreaProps, 'width'>;

export const TextAreaStyle = styled.textarea<TextAreaStyleProps>`
    margin-top: 8px;

    display: block;

    border-radius: 0.5rem;
    border: 1px solid #acb8c4;
    padding: 10px;
    font-size: 16px;

    width: ${({ width }) => (width === 'auto' ? 'auto' : '100%')};

    &:focus {
        outline: none;
        box-shadow: 0px 0px 2px #6b8096;
        border-color: #6b8096;
    }

    &::placeholder {
        color: #acb8c4;
    }
`;
