import api from '../../../api';

/* =====================================================
    LISTAR TODAS AS INTERVENÇÕES DO CASO
===================================================== */

export async function ListarIntervencoes(idCaso: number) {
    const { data } = await api.get(`/api/v1/casos/${idCaso}/intervencoes`);

    return data;
}

/* =====================================================
    AGRUPAR POR AUTOR
===================================================== */

export async function ListarIntervencoesAgrupadoPorAutor(idCaso: number) {
    const { data } = await api.get(`/api/v1/casos/${idCaso}/intervencoes/agrupado-por-autor`);

    return data;
}

/* =====================================================
    CALENDÁRIO
===================================================== */

export async function ListarIntervencoesCalendario(idCaso: number) {
    const { data } = await api.get(`/api/v1/casos/${idCaso}/intervencoes/calendario`);

    return data;
}
