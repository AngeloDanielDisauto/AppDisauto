// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type User = {
  id: Number;
  codigo: string | null;
  nomeCompleto: string | null;
  desconto_1: string | null;
  desconto_2: string | null;
  desconto_3: string | null;
  descontoOferta: string | null;
  contador: Number | null;
  contadorAcesso: Number | null;
  dataLimite: string | null;
  dataUltimoAcesso: string | null;
  acessoEstoqueTotal: Number | null;
  empresa: string | null;
  cidade: string | null;
  uf: string | null;
  mwm: string | null;
  postoMasterPower: string | null;
  servicoMasterPower: string | null;
  aliquotaCliente: string | null;
};

type AuthContextType = {
  user: User | null;
  logar: (email: string, password: string) => Promise<void>;
  deslogar: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const baseApiLogin = 'https://apibancosql.onrender.com/clientes/login';

  useEffect(() => {
    // carrega as informações armazenadas local
    async function loadLocalData() {
      const storedToken = await AsyncStorage.getItem('@auth:token');
      const storedUser = await AsyncStorage.getItem('@auth:user');

      if (storedToken && storedUser) {
        // Define o token globalmente
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }

    loadLocalData();
  }, []);

  const logar = async (login: string, senha: string) => {
    const apiLogin = `${baseApiLogin}?login=${login}&senha=${senha}`;
    try {
      const res = await axios.get(apiLogin);
      const { user, token } = res.data;

      await AsyncStorage.setItem('@auth:token', token);
      await AsyncStorage.setItem('@auth:user', JSON.stringify(user));

      setUser(user);
    } catch (error: any) {
      // retorna erro
      /* erro de login vem da api no padrão:
        success: true|false
        message: 'Login|senha inválido'
      */
      if (error.response) {
        throw new Error(error.response.data.message || 'Erro de login');
      } else {
        throw new Error('Erro de conexão com o servidor');
      }
    }
  };

  const deslogar = async () => {
      await AsyncStorage.removeItem('@auth:user');
      await AsyncStorage.removeItem('@auth:token');  
      setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logar, deslogar, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
