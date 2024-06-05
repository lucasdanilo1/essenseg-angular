export interface Cliente {
    id: number;
    ativo: boolean;
    dadosSeguradoDetalhadoDTO: {
      nome: string;
      dataNascimento: string;
      telefone: string;
      cep: string;
      endereco: string;
      email: string;
      corretorId: number;
      operadoraId: number;
      administradoraId: number;
      vigencia: string;
      planoId: number;
      percentualComissao: number,
      valorDoPlanoBruto: number;
      adesao: number;
      segmentacao: string;
    };
    dadosEspecificosClienteDetalhadoDTO: {
      cpf: string;
      nomeResponsavel: string | null;
      cpfResponsavel: string | null;
      peso: number;
      altura: number;
    };
    observacoes: string | null;
  }
  