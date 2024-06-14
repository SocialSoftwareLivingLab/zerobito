import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { ModalHeader, IconeFechar, reactModalCustomStyle } from './styles';

import './styles.css';

export interface ModalProps {
    children: React.ReactNode | React.ReactNode[];
    titulo: string;
    aberto: boolean;
    handleFecharModal: () => void;
}

export default function Modal({ children, titulo, aberto, handleFecharModal }: ModalProps) {
    return (
        <ReactModal
            isOpen={aberto}
            style={reactModalCustomStyle}
            closeTimeoutMS={200}
            onRequestClose={handleFecharModal}>
            <ModalHeader>
                <h2>{titulo}</h2>
                <IconeFechar onClick={() => handleFecharModal()} />
            </ModalHeader>
            <main>{children}</main>
        </ReactModal>
    );
}
