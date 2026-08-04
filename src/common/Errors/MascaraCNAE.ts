export function validarCNAE(cnae: string): boolean {
    if (cnae === '') return true;
    // Remove tudo que não for número
    cnae = cnae.replace(/[^\d]/g, '');

    // Verifica se está vazio ou se não tem exatamente 7 dígitos
    if (cnae.length !== 7) return false;

    return true;
}
