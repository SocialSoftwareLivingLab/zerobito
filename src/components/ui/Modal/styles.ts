import { FaRegWindowClose } from 'react-icons/fa';
import styled from 'styled-components';

import { Styles } from 'react-modal';

export const reactModalCustomStyle: Styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '800px',
        minHeight: '60%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

export const ModalHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 16px 0px;

    h2 {
        color: #134780;
        font-size: 24px;
        font-weight: bold;
        text-align: left;
    }
`;

export const IconeFechar = styled(FaRegWindowClose)`
    color: #134780;
    width: 25px;
    height: 25px;
    cursor: pointer;

    &:hover {
        color: #0a2a42;
    }
`;
