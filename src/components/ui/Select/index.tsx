import React, { forwardRef } from 'react';
import { SelectArea, SelectField, SelectLabel } from './styles';

export interface SelectOptionProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selected?: boolean;
}

export function SelectOption({ value, label, disabled, selected }: SelectOptionProps) {
    return (
        <option value={value} disabled={disabled} selected={selected}>
            {label}
        </option>
    );
}

export interface SelectProps {
    label: string;
    width?: 'auto' | 'full';
    children: React.ReactElement<SelectOptionProps>[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, width = 'auto', children, ...rest }: SelectProps, ref) => {
        return (
            <SelectArea>
                <SelectLabel>{label}</SelectLabel>
                <SelectField ref={ref} width={width} {...rest}>
                    {children}
                </SelectField>
            </SelectArea>
        );
    }
);

Select.displayName = 'Select';
