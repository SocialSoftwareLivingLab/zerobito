import React, { useState } from 'react';

const Select = () => {
    const [selectedOption, setSelectedOption] = useState('option2');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }
    return (
        <select value={selectedOption} onChange={handleChange}>
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
            <option value="Estagiário">Estagiário</option>
            <option value="Terceirizado">Terceirizado</option>
            <option value="Autônomo">Autônomo</option>
        </select>
    );
}

export default Select;