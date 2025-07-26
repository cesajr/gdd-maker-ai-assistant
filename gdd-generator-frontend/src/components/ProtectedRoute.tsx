// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Enquanto verifica o estado de autenticação, não renderiza nada
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
        Carregando...
      </div>
    );
  }

  // Se não houver usuário após a verificação, redireciona para o login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Se houver usuário, renderiza a página filha (Dashboard)
  return children;
};

export default ProtectedRoute;
