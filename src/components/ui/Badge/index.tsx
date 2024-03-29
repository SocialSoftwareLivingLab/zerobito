import React from 'react';
import { BadgeContainer } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

export interface BadgeProps {
    texto: string;
    hint?: string;
    type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

export default function Badge(props: BadgeProps) {
    return (
        <BadgeContainer type={props.type} title={props.texto}>
            {props.texto}

            {props.hint && (
                <FiAlertCircle
                    style={{
                        marginLeft: '0.5em',
                        verticalAlign: 'middle'
                    }}
                    title={props.hint}
                />
            )}
        </BadgeContainer>
    );
}
