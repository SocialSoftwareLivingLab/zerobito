import { FinalizacaoContainer } from './styles';
import AcoesFinalizacao from './Acoes';
import AtoresFinalizacao from './Atores';

export default function Finalizacao() {
    return (
        <FinalizacaoContainer>
            <AcoesFinalizacao />
            <AtoresFinalizacao />
        </FinalizacaoContainer>
    );
}
