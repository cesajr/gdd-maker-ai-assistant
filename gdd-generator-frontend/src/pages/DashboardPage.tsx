// src/pages/DashboardPage.tsx (Versão Simplificada sem a seção "Meus Projetos")

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../services/firebase';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusIcon, DocumentDuplicateIcon, Cog6ToothIcon, ArrowLeftEndOnRectangleIcon
} from '@heroicons/react/24/outline';

// O tipo 'Project' não é mais necessário aqui, já que não vamos listar os projetos.

const DashboardPage: React.FC = () => {
  const [newGddIdea, setNewGddIdea] = useState('');
  const [template, setTemplate] = useState('default');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Hook para navegação programática

  const handleCreateGdd = async () => {
    if (!newGddIdea.trim()) {
      alert('Por favor, descreva a ideia central do seu jogo.');
      return;
    }
    if (template === 'custom' && !customPrompt.trim()) {
      alert('Por favor, insira seu prompt personalizado.');
      return;
    }
    setIsGenerating(true);
    try {
      const response = await api.post('/gdds/generate', {
        idea: newGddIdea,
        template: template,
        customPrompt: customPrompt
      });
      
      // Ao invés de adicionar a uma lista, navegamos o usuário
      // diretamente para a página do GDD recém-criado.
      const newGddId = response.data.id;
      if (newGddId) {
        navigate(`/gdd/${newGddId}`);
      } else {
        throw new Error("ID do novo GDD não foi retornado pela API.");
      }

      setNewGddIdea('');
      setCustomPrompt('');
    } catch (error) {
      console.error('Erro ao gerar GDD:', error);
      alert('Houve um erro ao tentar gerar o GDD. Verifique o console do backend para mais detalhes.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => auth.signOut();
  const userAvatar = currentUser?.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${currentUser?.displayName || 'User'}`;

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <aside className="w-64 flex-shrink-0 bg-gray-900 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-teal-400 mb-8">GDD.AI</h1>
          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center p-2 bg-gray-700 rounded-lg text-white font-semibold">
              <DocumentDuplicateIcon className="h-6 w-6 mr-3" /> Dashboard
            </Link>
            <a href="#" className="flex items-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
              <Cog6ToothIcon className="h-6 w-6 mr-3" /> Configurações
            </a>
          </nav>
        </div>
        <div className="space-y-4">
          <div className="flex items-center p-2">
            <img src={userAvatar} alt="Avatar" className="h-10 w-10 rounded-full mr-3 bg-gray-700" />
            <div><p className="font-semibold">{currentUser?.displayName || 'Usuário'}</p><p className="text-xs text-gray-400">Plano Gratuito</p></div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center p-2 text-gray-400 hover:bg-red-800 hover:text-white rounded-lg transition-colors">
            <ArrowLeftEndOnRectangleIcon className="h-6 w-6 mr-3" /> Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto flex flex-col items-center justify-center">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-bold">Crie um Novo Game Design Document</h2>
          <p className="text-gray-400 mt-2 max-w-2xl">Descreva sua ideia, escolha um modelo ou personalize seu prompt, e deixe a IA fazer o trabalho pesado para você.</p>
        </header>

        <section className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-3xl">
          <label htmlFor="gdd-idea" className="block text-sm font-medium text-gray-400 mb-2">Ideia Central do Jogo</label>
          <textarea id="gdd-idea" value={newGddIdea} onChange={(e) => setNewGddIdea(e.target.value)} className="w-full h-28 p-3 bg-gray-800 border-2 border-gray-700 rounded-lg" placeholder="Ex: Um jogo de aventura puzzle onde o jogador controla a sombra de uma criança para resolver enigmas..."></textarea>
          
          <div className="mt-4">
            <label htmlFor="template-select" className="block text-sm font-medium text-gray-400 mb-2">Estrutura do GDD</label>
            <select id="template-select" value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white">
              <option value="default">Template Padrão</option>
              <option value="rpg">Template de RPG</option>
              <option value="strategy">Template de Estratégia</option>
              <option value="custom">Prompt Personalizado</option>
            </select>
          </div>

          {template === 'custom' && (
            <div className="mt-4">
              <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-400 mb-2">Seu Prompt Personalizado</label>
              <textarea id="custom-prompt" value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} className="w-full h-36 p-3 bg-gray-800 border-2 border-gray-700 rounded-lg" placeholder="Descreva a estrutura JSON que você deseja..."></textarea>
            </div>
          )}

          <button onClick={handleCreateGdd} disabled={isGenerating} className="w-full mt-6 bg-teal-500 hover:bg-teal-600 font-bold py-3 px-6 rounded-lg disabled:bg-gray-500 flex items-center justify-center">
            <PlusIcon className="h-6 w-6 mr-2" /> 
            {isGenerating ? 'Gerando...' : 'Gerar GDD e Visualizar'}
          </button>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;


