import { InvestigacaoContainer } from './styles';
import AcoesInvestigacao from './Acoes';
import MapaInvestigacao from './Etapas';

export default function Investigacao() {
    return (
        <InvestigacaoContainer>
            <AcoesInvestigacao />
            <MapaInvestigacao></MapaInvestigacao>
        </InvestigacaoContainer>
    );
}
