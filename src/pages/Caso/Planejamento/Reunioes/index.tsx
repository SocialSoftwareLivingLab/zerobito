import AcoesReuniao from '../Acoes';
import AtoresReuniao from '../Tarefas';
import ReuniaoPage from '../../shared/ReuniaoPage';

export type { DataReuniaoFormField } from '../../shared/ReuniaoPage';

export default function ReunioesPlanejamento() {
    return <ReuniaoPage acoes={<AcoesReuniao />} atores={<AtoresReuniao />} />;
}
