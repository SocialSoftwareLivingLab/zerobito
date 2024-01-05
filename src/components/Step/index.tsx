import React from 'react';
import "./style.css"

const Step = ({ index, active }) => {
    return (
        <>
           <text>Passo {index + " "}</text> 
        </>
    );
};

export default Step;