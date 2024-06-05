export interface Segurado{
    id: string;
    ativo: boolean;
    tipo: string;
	dataCadastro: string;
	nome: string,
    nomeFantasia: string,
	telefone: string,
    email: string;
	cpfCnpj: string,
    segmentacao: string
}