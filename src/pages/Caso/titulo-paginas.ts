export interface InfoPaginaCaso {
    path: string;
    titulo: string;
    explicacao: string;
}

export const tituloPaginas: InfoPaginaCaso[] = [
    {
        path: '/casos/:id/dossie',
        titulo: 'Dossiê',
        explicacao: 'Aqui você encontra informações detalhadas sobre o caso.'
    },
    {
        path: '/casos/:id/notificacoes',
        titulo: 'Documentação Oficial',
        explicacao: 'Aqui você encontra documentos oficiais para a qualificação do caso.'
    }
];
