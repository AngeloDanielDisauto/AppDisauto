export interface Produto {
  id: number;
  codigo: string;
  estoque: number;
  descricao: string;
  preco: number;
}

export interface ProdutoOrcamento {
  id: number;
  codigo: string;
  descricao: string;
  preco: number;
  quantidade: number;
}