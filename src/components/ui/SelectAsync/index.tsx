import React, { forwardRef } from 'react';

import AsyncSelect from 'react-select/async';
import { useDebouncedCallback } from 'use-debounce';
import { SelectArea, SelectBorderColor, SelectLabel } from './styles';

type SelectAsyncItemValue = number | string;

export type SelectItem = {
    label: string;
    value: SelectAsyncItemValue;
};

export interface SelectAsyncProps {
    loadOptions: (inputValue: string) => Promise<SelectItem[]>;
    label: string;
    placeholder?: string;
    onChange: (value: SelectAsyncItemValue) => void;
    name: string;
}

const SelectAsync = forwardRef<never, SelectAsyncProps>(
    ({ loadOptions, label, placeholder = 'Selecione uma opção', onChange, name }, ref) => {
        const loadOptionsDebounced = useDebouncedCallback((inputText, callback) => {
            loadOptions(inputText).then((options) => callback(options));
        }, 300);

        return (
            <SelectArea>
                <SelectLabel>{label}</SelectLabel>
                <AsyncSelect
                    className="select-async"
                    defaultOptions
                    loadOptions={loadOptionsDebounced}
                    loadingMessage={() => 'Carregando...'}
                    noOptionsMessage={() => 'Nenhum resultado encontrado'}
                    ref={ref}
                    onChange={(selectedOption: SelectItem) => onChange(selectedOption.value)}
                    placeholder={placeholder}
                    name={name}
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            borderColor: SelectBorderColor
                        })
                    }}
                />
            </SelectArea>
        );
    }
);

SelectAsync.displayName = 'SelectAsync';

export default SelectAsync;
