import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProdutoComQuantidade } from "../data/types"; // importa o tipo já existente de Produto

// Define o formato do contexto (o que estará disponível para toda a aplicação)
interface AppContextType {
  produtosOrcamento: ProdutoComQuantidade[]; // lista de produtos adicionados ao orçamento
  adicionarProduto: (produto: ProdutoComQuantidade) => void; // função para adicionar produto
  removerProduto: (id: number) => void;         // função para remover produto pelo ID
  limparOrcamento: () => void;                  // função para limpar toda a lista
  totalOrcamento: number; // total do orçamento
}

// Cria o contexto inicial, mas sem valor (undefined)
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider: componente que vai "envolver" o app e compartilhar o estado
export function AppProvider({ children }: { children: ReactNode }) {
  // Estado global: lista de produtos selecionados para orçamento
  const [produtosOrcamento, setProdutosOrcamento] = useState<ProdutoComQuantidade[]>([]);

  // Adiciona um produto ao orçamento
  const adicionarProduto = (produto: ProdutoComQuantidade) => {
    setProdutosOrcamento((prev) => {
      // Verifica se já existe para evitar duplicados (opcional)
      const jaExiste = prev.find((p) => p.id === produto.id);
      if (jaExiste) return prev; // se já existe, não adiciona de novo

      // Caso contrário, adiciona ao final
      return [...prev, produto];
    });
  };

  // Remove um produto do orçamento pelo ID
  const removerProduto = (id: number) => {
    setProdutosOrcamento((prev) => prev.filter((p) => p.id !== id));
  };

  // Limpa toda a lista de produtos selecionados
  const limparOrcamento = () => {
    setProdutosOrcamento([]);
  };

  // calcula o total sempre que produtosOrcamento mudar
  const totalOrcamento = produtosOrcamento.reduce(
    (acc, p) => acc + p.preco * p.quantidade,
    0
  );

  return (
    // Disponibiliza os valores e funções para toda a árvore de componentes
    <AppContext.Provider
      value={{ 
        produtosOrcamento, 
        adicionarProduto, 
        removerProduto, 
        limparOrcamento, 
        totalOrcamento 
      }}
    >
      {children} {/* Renderiza o restante do app aqui dentro */}
    </AppContext.Provider>
  );
}

// Hook para facilitar o uso do contexto em qualquer tela
export function useAppContext() {
  const context = useContext(AppContext);
  // Se tentar usar fora do provider, gera erro
  if (!context) throw new Error("useAppContext deve ser usado dentro do AppProvider");
  return context;
}
