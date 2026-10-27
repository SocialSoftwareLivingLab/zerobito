import { ComentarioAtorRelatorio } from '../../../../common/api/casos/finalizacao/relatorio-finalizacao';

interface ListaComentariosProps {
    readonly titulo: string;
    readonly comentarios: ComentarioAtorRelatorio[];
}

function formatarData(data: string): string {
    return new Date(data).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/** Comentários do grupo de trabalho em um ator, somente leitura, com autor e data. */
export default function ListaComentarios({
    titulo,
    comentarios
}: ListaComentariosProps): JSX.Element | null {
    if (comentarios.length === 0) return null;

    return (
        <div style={{ marginTop: '0.75rem' }}>
            <span
                style={{
                    display: 'block',
                    color: '#134780',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    marginBottom: '0.5rem'
                }}>
                {titulo} ({comentarios.length})
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {comentarios.map((comentario) => (
                    <div
                        key={comentario.id}
                        style={{
                            background: '#fff',
                            border: '1px solid #cbd5e0',
                            borderLeft: '4px solid #134780',
                            borderRadius: '4px',
                            padding: '0.6rem 0.8rem'
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.8rem',
                                marginBottom: '0.25rem'
                            }}>
                            <strong style={{ color: '#2d3748' }}>{comentario.autor.nome}</strong>
                            <span style={{ color: '#64748b' }}>
                                {formatarData(comentario.dataAtualizacao)}
                            </span>
                        </div>
                        <div
                            style={{
                                fontSize: '0.9rem',
                                color: '#2d3748',
                                whiteSpace: 'pre-wrap'
                            }}>
                            {comentario.texto}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
