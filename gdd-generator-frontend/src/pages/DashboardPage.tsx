// src/pages/DashboardPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../services/firebase';
import api from '../services/api';
import { Link } from 'react-router-dom';

// 1. Lista de importações de ícones foi limpa e atualizada.
import {
  PlusIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  ArrowLeftEndOnRectangleIcon, // Ícone de logout atualizado
  TrashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

type Project = {
  id: string;
  title: string;
  type: string;
  status: string;
  lastModified: string;
};

const DashboardPage: React.FC = () => {
  const [newGddIdea, setNewGddIdea] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      if (currentUser) {
        try {
          const response = await api.get('/gdds');
          setProjects(response.data);
        } catch (error) { console.error('Erro ao buscar projetos:', error); } 
        finally { setLoading(false); }
      }
    };
    fetchProjects();
  }, [currentUser]);

  const handleCreateGdd = async () => {
    if (!newGddIdea.trim()) return;
    setIsGenerating(true);
    try {
      const response = await api.post('/gdds/generate', { idea: newGddIdea });
      setProjects(prev => [response.data, ...prev]);
      setNewGddIdea('');
    } catch (error) { console.error('Erro ao gerar GDD:', error); } 
    finally { setIsGenerating(false); }
  };

  const handleDeleteProject = async (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await api.delete(`/gdds/${projectId}`);
        setProjects(currentProjects => currentProjects.filter(p => p.id !== projectId));
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
        alert('Falha ao excluir o projeto.');
      }
    }
  };

  const handleLogout = () => { auth.signOut(); };

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
            <div>
              <p className="font-semibold">{currentUser?.displayName || 'Usuário'}</p>
              <p className="text-xs text-gray-400">Plano Gratuito</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center p-2 text-gray-400 hover:bg-red-800 hover:text-white rounded-lg transition-colors">
            {/* 2. Ícone de logout atualizado aqui também */}
            <ArrowLeftEndOnRectangleIcon className="h-6 w-6 mr-3" /> Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-4xl font-bold">Bem-vindo, {currentUser?.displayName?.split(' ')[0] || 'Dev'}!</h2>
          <p className="text-gray-400 mt-2">Pronto para transformar sua próxima grande ideia em realidade?</p>
        </header>

        <section className="bg-gray-900 p-6 rounded-xl shadow-lg mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-teal-400">Comece um Novo Game Design Document</h3>
          <textarea
            value={newGddIdea}
            onChange={(e) => setNewGddIdea(e.target.value)}
            className="w-full h-24 p-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500"
            placeholder="Descreva a ideia central do seu jogo aqui..."
          ></textarea>
          <button onClick={handleCreateGdd} disabled={isGenerating} className="mt-4 w-full md:w-auto flex items-center justify-center bg-teal-500 hover:bg-teal-600 font-bold py-3 px-6 rounded-lg disabled:bg-gray-500">
            <PlusIcon className="h-6 w-6 mr-2" /> {isGenerating ? 'Gerando...' : 'Gerar GDD com IA'}
          </button>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold">Meus Projetos</h3>
            <div className="relative">
              <input type="text" placeholder="Buscar projetos..." className="bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500" />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          {loading ? ( <p>Carregando projetos...</p> ) 
            : projects.length === 0 ? ( <div className="text-center ...">Nenhum projeto encontrado...</div> ) 
            : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link to={`/gdd/${project.id}`} key={project.id} className="block group">
                  <div className="bg-gray-900 p-5 rounded-lg h-full flex flex-col justify-between group-hover:scale-105 group-hover:shadow-teal-500/20 transition-all duration-300 cursor-pointer">
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-3 ${project.status === 'Finalizado' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{project.status}</span>
                      <h4 className="text-xl font-bold mb-1">{project.title}</h4>
                      <p className="text-sm text-gray-400 mb-4">{project.type}</p>
                    </div>
                    <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                      <p className="text-xs text-gray-500">Alterado: {new Date(project.lastModified).toLocaleDateString()}</p>
                      <div className="flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => handleDeleteProject(e, project.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
