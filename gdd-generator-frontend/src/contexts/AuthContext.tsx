// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'; // 1. Importe 'type User' para o tipo e 'signOut' para a função.
import { auth } from '../services/firebase';

// 2. Defina uma interface para o formato do nosso contexto.
//    Isso garante que todos os componentes saibam quais valores estão disponíveis.
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>; // 3. Adicionamos a função logout à "assinatura" do nosso contexto.
}

// 4. Crie o contexto com o tipo correto.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 5. Nosso hook customizado para usar o contexto facilmente.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// 6. O componente Provedor que vai "abraçar" nossa aplicação.
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // O ouvinte do Firebase que atualiza o usuário em tempo real.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Limpa o ouvinte quando o componente é removido.
  }, []);

  // 7. A função de logout que chama a função do Firebase.
  //    Ela retorna uma Promise que é resolvida quando o logout é concluído.
  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  // 8. O objeto 'value' que será compartilhado com todos os componentes filhos.
  //    Ele deve corresponder exatamente ao formato da nossa interface AuthContextType.
  const value: AuthContextType = {
    currentUser,
    loading,
    logout, // A nova função de logout está disponível aqui.
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
