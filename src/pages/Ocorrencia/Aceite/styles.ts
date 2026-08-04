import styled from 'styled-components';
import { ButtonStyle } from '../../../components/ui/Button/styles';

export const Secao = styled.section`
    margin-top: 24px;
    width: 100%;

    h3 {
        font-size: 1.5em;
        display: inline;
        margin-right: 10px;
    }
`;

export const ToggleButtonGroup = styled.div`
    padding: 16px 0;

    display: flex;
    gap: 8px;

    width: 100%;
`;

export interface ToggleButtonProps {
    selected: boolean;
}

export const ToggleButton = styled(ButtonStyle)<ToggleButtonProps>`
    width: 300px;
    padding: 24px;

    font-weight: bold;

    background-color: ${(props) => (props.selected ? '#134780' : '#fff')};
    color: ${(props) => (props.selected ? '#fff' : '#134780')};

    border: 2px solid #134780;

    &:hover {
        background-color: ${(props) => (props.selected ? '#0c2b4d' : '#eee')};
        color: ${(props) => (props.selected ? '#fffffe' : '#134780')};
    }
`;
