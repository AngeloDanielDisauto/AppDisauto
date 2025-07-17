export interface Produto {
  id: number;
  codigo: string;
  estoque: number;
  descricao: string;
  preco: number;
}

export interface ProdutoComQuantidade {
  id: number;
  codigo: string;
  estoque: number;
  descricao: string;
  preco: number;
  quantidade: number;
}