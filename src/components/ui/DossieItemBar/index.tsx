import React from 'react';
import { DossieBarContainerStyle } from './styles';
import { Button } from '../Button';

export function DossieBarContainer() {
    return (
        <DossieBarContainerStyle>
            <header>
                <Button
                    type="submit"
                    size="small"
                    action={() => {
                        console.log('uhul');
                    }}>
                    Aceitar
                </Button>
            </header>
        </DossieBarContainerStyle>
    );
}
