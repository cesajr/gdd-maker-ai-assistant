// src/pages/LoginPage.tsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../services/firebase";
import { useAuth } from '../contexts/AuthContext';

// Ícones
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.151,44,30.63,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
);
const GitHubIcon = () => (
    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
);

const LoginPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (provider: 'google' | 'github') => {
    const authProvider = provider === 'google' ? googleProvider : githubProvider;
    try {
      await signInWithPopup(auth, authProvider);
    } catch (error) {
      console.error(`Erro no login com ${provider}:`, error);
      alert(`Falha ao fazer login com ${provider}. Tente novamente.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Bem-vindo de Volta!</h1>
          <p className="mt-2 text-gray-400">Escolha seu método de login para continuar.</p>
        </div>
        <div className="space-y-4">
          <button onClick={() => handleLogin('google')} className="w-full flex items-center justify-center p-3 rounded-lg font-semibold bg-white text-gray-800 hover:bg-gray-200 transition-colors duration-300 shadow-md">
            <GoogleIcon /> Entrar com Google
          </button>
          <button onClick={() => handleLogin('github')} className="w-full flex items-center justify-center p-3 rounded-lg font-semibold bg-gray-900 text-white hover:bg-black transition-colors duration-300 shadow-md">
            <GitHubIcon /> Entrar com GitHub
          </button>
        </div>
        <div className="text-center pt-2">
            <Link to="/" className="text-sm text-gray-400 hover:text-teal-400 hover:underline transition-colors">
                ← Voltar para a Home Page
            </Link>
        </div>
        <div className="text-center text-xs text-gray-500">
          <p>
            Ao continuar, você concorda com nossos{' '} <Link to="/termos" className="underline hover:text-teal-400">Termos de Serviço</Link>{' '} e{' '} <Link to="/privacidade" className="underline hover:text-teal-400">Política de Privacidade</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
