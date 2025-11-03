import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
    editarOcorrencia,
    EditarOcorrenciaRequest
} from '../../../../common/api/ocorrencias/editar-ocorrencia';
import {
    TipoFonteDenuncia,
    CondicaoVitima
} from '../../../../common/api/ocorrencias/criar-ocorrencia';
import './style.css';

interface EditarOcorrenciaModalProps {
    ocorrencia: {
        id: number;
        titulo: string;
        descricao: string;
        data: string;
        local: {
            estado: string;
            cidade: string;
            logradouro: string;
        };
        vitima: {
            numero: string;
            nome: string;
            vinculo: string;
            condicao: string;
        };
        empresa: {
            nome: string;
            cnpj: string;
            cnae?: string;
            tomadoraServico?: {
                nome?: string;
                cnpj?: string;
                cnae?: string;
            };
        };
        fonte: {
            tipo: string;
            outroTipo?: string;
            detalhe: string;
        };
    };
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function EditarOcorrenciaModal({
    ocorrencia,
    isOpen,
    onClose,
    onSuccess
}: EditarOcorrenciaModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        titulo: ocorrencia.titulo,
        descricao: ocorrencia.descricao,
        data: ocorrencia.data.split('T')[0],
        estado: ocorrencia.local.estado,
        cidade: ocorrencia.local.cidade,
        logradouro: ocorrencia.local.logradouro,
        numeroVitima: ocorrencia.vitima.numero || '',
        nomeVitima: ocorrencia.vitima.nome,
        vinculoVitima: ocorrencia.vitima.vinculo,
        condicaoVitima: ocorrencia.vitima.condicao,
        nomeEmpresa: ocorrencia.empresa.nome,
        cnpjEmpresa: ocorrencia.empresa.cnpj,
        cnaeEmpresa: ocorrencia.empresa.cnae || '',
        nomeTomadora: ocorrencia.empresa.tomadoraServico?.nome || '',
        cnpjTomadora: ocorrencia.empresa.tomadoraServico?.cnpj || '',
        cnaeTomadora: ocorrencia.empresa.tomadoraServico?.cnae || '',
        tipoFonte: ocorrencia.fonte.tipo,
        outroTipoFonte: ocorrencia.fonte.outroTipo || '',
        detalheFonte: ocorrencia.fonte.detalhe
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload: EditarOcorrenciaRequest = {
                titulo: formData.titulo,
                descricao: formData.descricao,
                data: new Date(formData.data),
                local: {
                    estado: formData.estado,
                    cidade: formData.cidade,
                    logradouro: formData.logradouro
                },
                vitima: {
                    numero: formData.numeroVitima,
                    nome: formData.nomeVitima,
                    vinculo: formData.vinculoVitima,
                    condicao: formData.condicaoVitima as CondicaoVitima
                },
                empresa: {
                    nome: formData.nomeEmpresa,
                    cnpj: formData.cnpjEmpresa,
                    cnae: formData.cnaeEmpresa,
                    tomadoraServico: formData.nomeTomadora
                        ? {
                              nome: formData.nomeTomadora,
                              cnpj: formData.cnpjTomadora,
                              cnae: formData.cnaeTomadora
                          }
                        : undefined
                },
                fonte: {
                    tipo: formData.tipoFonte as TipoFonteDenuncia,
                    outroTipo: formData.outroTipoFonte,
                    detalhe: formData.detalheFonte
                }
            };

            await editarOcorrencia(ocorrencia.id, payload);

            // ← TROCAR: toast.success('Ocorrência atualizada com sucesso!');
            Swal.fire({
                title: 'Sucesso!',
                text: 'Ocorrência atualizada com sucesso!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            onSuccess();
            onClose();
        } catch (error: unknown) {
            console.error('Erro ao atualizar ocorrência:', error);
            const errorMessage =
                error instanceof Error && 'response' in error
                    ? (error as { response?: { data?: { message?: string } } }).response?.data
                          ?.message
                    : undefined;

            Swal.fire({
                title: 'Erro!',
                text: errorMessage || 'Erro ao atualizar ocorrência. Tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Editar Comunicação de Evento</h2>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    {/* Informações Básicas */}
                    <section className="form-section">
                        <h3>Informações Básicas</h3>

                        <div className="form-group">
                            <label htmlFor="titulo">Título *</label>
                            <input
                                id="titulo"
                                name="titulo"
                                type="text"
                                value={formData.titulo}
                                onChange={handleChange}
                                required
                                placeholder="Título da ocorrência"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricao">Descrição *</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                                placeholder="Descreva o evento"
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="data">Data do Evento *</label>
                            <input
                                id="data"
                                name="data"
                                type="date"
                                value={formData.data}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </section>

                    {/* Local */}
                    <section className="form-section">
                        <h3>Local</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="estado">Estado *</label>
                                <input
                                    id="estado"
                                    name="estado"
                                    type="text"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex: SP"
                                    maxLength={2}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cidade">Cidade *</label>
                                <input
                                    id="cidade"
                                    name="cidade"
                                    type="text"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex: São Paulo"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="logradouro">Logradouro *</label>
                            <input
                                id="logradouro"
                                name="logradouro"
                                type="text"
                                value={formData.logradouro}
                                onChange={handleChange}
                                required
                                placeholder="Endereço completo"
                            />
                        </div>
                    </section>

                    {/* Vítima */}
                    <section className="form-section">
                        <h3>Vítima</h3>

                        <div className="form-group">
                            <label htmlFor="numeroVitima">Número de Vítimas</label>
                            <input
                                id="numeroVitima"
                                name="numeroVitima"
                                type="text"
                                value={formData.numeroVitima}
                                onChange={handleChange}
                                placeholder="Ex: 1, 2, Desconhecido"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nomeVitima">Nome da Vítima</label>
                            <input
                                id="nomeVitima"
                                name="nomeVitima"
                                type="text"
                                value={formData.nomeVitima}
                                onChange={handleChange}
                                placeholder="Nome completo"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="vinculoVitima">Vínculo Empregatício *</label>
                                <select
                                    id="vinculoVitima"
                                    name="vinculoVitima"
                                    value={formData.vinculoVitima}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Selecione...</option>
                                    <option value="CLT">CLT</option>
                                    <option value="PJ">PJ</option>
                                    <option value="Estagiário">Estagiário</option>
                                    <option value="Aprendiz">Aprendiz</option>
                                    <option value="Temporário">Temporário</option>
                                    <option value="Terceirizado">Terceirizado</option>
                                    <option value="Autônomo">Autônomo</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="condicaoVitima">Condição da Vítima *</label>
                                <select
                                    id="condicaoVitima"
                                    name="condicaoVitima"
                                    value={formData.condicaoVitima}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Selecione...</option>
                                    <option value="OBITO">Óbito</option>
                                    <option value="ATENDIMENTO_HOSPITALAR">
                                        Atendimento Hospitalar
                                    </option>
                                    <option value="INCIDENTE_ALTO_POTENCIAL">
                                        Incidente de Alto Potencial
                                    </option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Empresa */}
                    <section className="form-section">
                        <h3>Empresa</h3>

                        <div className="form-group">
                            <label htmlFor="nomeEmpresa">Nome da Empresa *</label>
                            <input
                                id="nomeEmpresa"
                                name="nomeEmpresa"
                                type="text"
                                value={formData.nomeEmpresa}
                                onChange={handleChange}
                                required
                                placeholder="Razão Social"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cnpjEmpresa">CNPJ *</label>
                                <input
                                    id="cnpjEmpresa"
                                    name="cnpjEmpresa"
                                    type="text"
                                    value={formData.cnpjEmpresa}
                                    onChange={handleChange}
                                    required
                                    placeholder="00.000.000/0000-00"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cnaeEmpresa">CNAE</label>
                                <input
                                    id="cnaeEmpresa"
                                    name="cnaeEmpresa"
                                    type="text"
                                    value={formData.cnaeEmpresa}
                                    onChange={handleChange}
                                    placeholder="0000-0/00"
                                />
                            </div>
                        </div>

                        <h4>Tomadora de Serviço (Opcional)</h4>

                        <div className="form-group">
                            <label htmlFor="nomeTomadora">Nome da Tomadora</label>
                            <input
                                id="nomeTomadora"
                                name="nomeTomadora"
                                type="text"
                                value={formData.nomeTomadora}
                                onChange={handleChange}
                                placeholder="Razão Social"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cnpjTomadora">CNPJ da Tomadora</label>
                                <input
                                    id="cnpjTomadora"
                                    name="cnpjTomadora"
                                    type="text"
                                    value={formData.cnpjTomadora}
                                    onChange={handleChange}
                                    placeholder="00.000.000/0000-00"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cnaeTomadora">CNAE da Tomadora</label>
                                <input
                                    id="cnaeTomadora"
                                    name="cnaeTomadora"
                                    type="text"
                                    value={formData.cnaeTomadora}
                                    onChange={handleChange}
                                    placeholder="0000-0/00"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Fonte */}
                    <section className="form-section">
                        <h3>Fonte da Informação</h3>

                        <div className="form-group">
                            <label htmlFor="tipoFonte">Tipo de Fonte *</label>
                            <select
                                id="tipoFonte"
                                name="tipoFonte"
                                value={formData.tipoFonte}
                                onChange={handleChange}
                                required>
                                <option value="">Selecione...</option>
                                <option value="ANONIMA">Anônima</option>
                                <option value="VITIMA">Vítima</option>
                                <option value="FAMILIAR">Familiar</option>
                                <option value="COLEGA_TRABALHO">Colega de Trabalho</option>
                                <option value="SINDICATO">Sindicato</option>
                                <option value="IMPRENSA">Imprensa</option>
                                <option value="SERVICO_SAUDE">Serviço de Saúde</option>
                                <option value="OUTRO">Outro</option>
                            </select>
                        </div>

                        {formData.tipoFonte === 'OUTRO' && (
                            <div className="form-group">
                                <label htmlFor="outroTipoFonte">Especifique o Tipo</label>
                                <input
                                    id="outroTipoFonte"
                                    name="outroTipoFonte"
                                    type="text"
                                    value={formData.outroTipoFonte}
                                    onChange={handleChange}
                                    placeholder="Especifique..."
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="detalheFonte">Detalhes da Fonte</label>
                            <textarea
                                id="detalheFonte"
                                name="detalheFonte"
                                value={formData.detalheFonte}
                                onChange={handleChange}
                                placeholder="Informações adicionais sobre a fonte"
                                rows={3}
                            />
                        </div>
                    </section>

                    {/* Botões */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="btn-secondary">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isLoading} className="btn-primary">
                            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
