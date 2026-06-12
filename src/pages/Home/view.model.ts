import { useState, useEffect } from 'react';
import { carregarOcorrencias } from '../../common/models/ocorrencias/get.ocorrencia';
import { OcorrenciaModel } from '../../common/models/ocorrencias/model';

function waitForToken(): Promise<string | null> {
    const t = localStorage.getItem('token');
    if (t) return Promise.resolve(t);

    return new Promise<string | null>((resolve) => {
        const interval = setInterval(() => {
            const tokenInterval = localStorage.getItem('token');
            if (tokenInterval) {
                clearInterval(interval);
                resolve(tokenInterval);
            }
        }, 50);
    });
}

const useHomeViewModel = () => {
    const [eventos, setOcorrencias] = useState<OcorrenciaModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchOcorrencias = async () => {
            const token = await waitForToken();

            if (!token) {
                console.warn('Token não carregado, requisição ignorada');
                setOcorrencias([]);
                setLoading(false);
                return;
            }

            try {
                const response = await carregarOcorrencias();
                if (mounted) {
                    setOcorrencias(response?.data ?? []);
                }
            } catch (error) {
                console.error(error);
                if (mounted) setOcorrencias([]);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchOcorrencias();

        return () => {
            mounted = false;
        };
    }, []);

    return {
        eventos,
        loading
    };
};

export default useHomeViewModel;
