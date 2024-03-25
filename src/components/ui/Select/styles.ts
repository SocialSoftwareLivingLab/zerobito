import styled from "styled-components";
import { SelectProps } from ".";

export const SelectArea = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;

    margin: 16px;
`;

export const SelectLabel = styled.label`
    color: #141414;
    font-size: 16px;
    font-weight: bold;

    text-align: left;
`;

export type SelectFieldProps = Pick<SelectProps, 'width'>;

export const SelectField = styled.select<SelectFieldProps>`
    width: 30%;
    border-radius: 0.5rem;
    border: 1px solid #ACB8C4;
    padding: 10px;
    font-size: 16px;
    margin-top: 8px;

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

