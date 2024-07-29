import React from 'react';
import { ConvitePageContainer, DadosConviteContainer } from './styles';
import { Button } from '../../components/ui/Button';

import { MdOutgoingMail } from 'react-icons/md';

export default function CasoConvite() {
    return (
        <ConvitePageContainer>
            <DadosConviteContainer>
                <header>
                    <span>ZerÓbito</span>
                    <span>
                        <MdOutgoingMail /> Olá, você tem um convite
                    </span>
                </header>
                <section>
                    <span>Nome e Sobrenome</span>, da <span>Instituição ABC</span>, convidou você
                    para contribuir com o caso Nº<span>12345</span>
                </section>
                <section>
                    <strong>Dados do caso</strong>
                    <span>
                        Acidente envolvendo X pessoas, com causas primárias, secundárias e
                        determinado nível de gravidade. Denunciado em uma data.
                    </span>
                </section>
                <section>
                    <Button type="submit">Aceitar</Button>
                    <Button type="cancel">Recusar</Button>
                    <Button>Indicar outro ator</Button>
                </section>
            </DadosConviteContainer>
        </ConvitePageContainer>
    );
}
