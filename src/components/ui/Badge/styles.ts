import styled from 'styled-components';
import { BadgeProps } from '.';

type BadgeColorMapping = {
    color: string;
    backgroundColor: string;
};

const badgeColorMapping: Record<string, BadgeColorMapping> = {
    primary: {
        color: '#fff',
        backgroundColor: '#007bff'
    },
    secondary: {
        color: '#fff',
        backgroundColor: '#6c757d'
    },
    success: {
        color: '#fff',
        backgroundColor: '#28a745'
    },
    danger: {
        color: '#fff',
        backgroundColor: '#dc3545'
    },
    warning: {
        color: '#212529',
        backgroundColor: '#ffc107'
    },
    info: {
        color: '#fff',
        backgroundColor: '#17a2b8'
    },
    light: {
        color: '#212529',
        backgroundColor: '#f8f9fa'
    },
    dark: {
        color: '#fff',
        backgroundColor: '#343a40'
    }
};

export type BadgeContainerProps = Pick<BadgeProps, 'type'>;

export const BadgeContainer = styled.span<BadgeContainerProps>`
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;

    color: ${({ type }) => badgeColorMapping[type].color};
    background-color: ${({ type }) => badgeColorMapping[type].backgroundColor};
`;
