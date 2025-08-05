// tipagem obrigatória com modelo que vem do banco de dados
export interface ProdutoComEstoque {
  id: number;
  id_fornecedor: number;
  codigo: string;
  referencia: string;
  descricao: string;
  dado4: string | null;
  especificacoes: string;
  dado5: string;
  dado6: string;
  marca: string;
  observacoes: string;
  contador: number;
  campanha: string | null;
  art_dpc1: string;
  art_qpc1: number;
  art_dpc: string;
  art_dpc2: string;
  art_qpc: number;
  art_qpc2: number;
  art_qpc3: number;
  art_dpc3: string;
  preco_bruto: string;
  preco_oferta: string;
  preco_bruto_parana: string;
  preco_oferta_parana: string;
  estoque_lages: string;
  estoque_joacaba: string;
  estoque_itajai: string;
  estoque_tubarao: string;
  estoque_filial_lages: string;
  estoque_maringa: string;
  estoque_rondonopolis: string;
  estoque_rio_do_sul: string;
  estoque_canoinhas: string;
  estoque_cacador: string;
  estoque_sao_jose: string;
  estoque_sao_miguel: string;
  estoque_guaramirim: string;
  em: string; // ISO date string
}


export interface ProdutoOrcamento {
  id: number;
  codigo: string;
  referencia: string;
  descricao: string;
  preco: number;
  quantidade: number;
}