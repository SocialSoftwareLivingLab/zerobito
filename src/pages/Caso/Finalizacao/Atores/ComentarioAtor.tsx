import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FaCommentAlt } from 'react-icons/fa';
import { Button } from '../../../../components/ui/Button';
import {
    ComentarioAtorRelatorio,
    salvarComentarioAtorRelatorio
} from '../../../../common/api/casos/finalizacao/relatorio-finalizacao';

interface ComentarioAtorProps {
    readonly idCaso: number;
    readonly idAtor: number;
    readonly idUsuario: number;
    readonly comentario?: ComentarioAtorRelatorio;
    readonly habilitado: boolean;
}

export default function ComentarioAtor({
    idCaso,
    idAtor,
    idUsuario,
    comentario,
    habilitado
}: ComentarioAtorProps): JSX.Element {
    const queryClient = useQueryClient();

    const [ativo, setAtivo] = useState<boolean>(!!comentario?.texto);
    const [texto, setTexto] = useState<string>(comentario?.texto ?? '');
    const [salvando, setSalvando] = useState<boolean>(false);
    const [erro, setErro] = useState<string | null>(null);

    const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

    const autoSalvar = async (valor: string): Promise<void> => {
        setSalvando(true);
        try {
            const salvo = await salvarComentarioAtorRelatorio(idCaso, idAtor, valor);
            queryClient.setQueryData<ComentarioAtorRelatorio[]>(
                ['relatorio-finalizacao', 'comentarios', idCaso],
                (anteriores = []) => {
                    const ehMeuNesteAtor = (c: ComentarioAtorRelatorio) =>
                        String(c.atorId) === String(idAtor) &&
                        String(c.autor.id) === String(idUsuario);
                    if (!salvo) return anteriores.filter((c) => !ehMeuNesteAtor(c));
                    return anteriores.some(ehMeuNesteAtor)
                        ? anteriores.map((c) => (ehMeuNesteAtor(c) ? salvo : c))
                        : [...anteriores, salvo];
                }
            );
            setErro(null);
        } catch (err) {
            console.error(err);
            setErro('Erro ao salvar comentário.');
        } finally {
            setSalvando(false);
        }
    };

    const handleTextoChange = (valor: string): void => {
        setTexto(valor);
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => autoSalvar(valor), 800);
    };

    return (
        <>
            {ativo && (
                <>
                    <span
                        style={{
                            display: 'block',
                            marginTop: '0.75rem',
                            color: '#134780',
                            fontWeight: 600,
                            fontSize: '0.85rem'
                        }}>
                        Seu comentário
                    </span>
                    <textarea
                        className="descricao-etapa"
                        value={texto}
                        disabled={!habilitado}
                        placeholder="Escreva seu comentário sobre este item..."
                        onChange={(e) => handleTextoChange(e.target.value)}
                    />
                </>
            )}
            <div className="acoes-etapa">
                {erro && <span style={{ fontSize: '0.8rem', color: '#CC0000' }}>{erro}</span>}
                <span
                    style={{
                        fontSize: '0.8rem',
                        color: '#888',
                        visibility: salvando ? 'visible' : 'hidden'
                    }}>
                    Salvando...
                </span>
                <span
                    title={
                        habilitado ? undefined : 'Disponível quando o relatório estiver em revisão'
                    }>
                    <Button
                        size="small"
                        type={ativo ? 'button' : 'default'}
                        disabled={!habilitado}
                        action={() => setAtivo((prev) => !prev)}>
                        <FaCommentAlt />
                        {ativo ? 'Fechar comentário' : 'Comentar'}
                    </Button>
                </span>
            </div>
        </>
    );
}
