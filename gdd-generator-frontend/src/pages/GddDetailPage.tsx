// src/pages/GddDetailPage.tsx

// A importação de 'ChangeEvent' foi removida, pois não é mais usada diretamente.
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';
import { ArrowLeftIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

type Project = {
  id: string;
  title: string;
  content: string;
};

const GddDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/gdds/${id}`);
        setProject(response.data);
        setContent(response.data.content);
        setTitle(response.data.title);
      } catch (error) {
        console.error("Erro ao buscar detalhes do projeto:", error);
        alert("Não foi possível carregar o projeto.");
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    if (id) { fetchProject(); }
  }, [id, navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put(`/gdds/${id}`, { title, content });
      if (project) {
        setProject({ ...project, title, content });
      }
      setIsEditMode(false);
    } catch (error) {
      console.error("Erro ao salvar o projeto:", error);
      alert("Falha ao salvar o projeto.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if(project) {
        setContent(project.content);
        setTitle(project.title);
    }
    setIsEditMode(false);
  }

  if (loading) return <div className="text-white text-center p-10">Carregando projeto...</div>;
  if (!project) return <div className="text-white text-center p-10">Projeto não encontrado.</div>;

  return (
    <div className="bg-gray-800 text-white min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="flex items-center text-teal-400 hover:text-teal-300">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Voltar para o Dashboard
          </Link>
          {isEditMode ? (
            <div className="flex gap-4">
                <button onClick={handleCancelEdit} className="flex items-center text-gray-400 hover:text-white"><XMarkIcon className="h-5 w-5 mr-1" /> Cancelar</button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg"><CheckIcon className="h-5 w-5 mr-2" />{isSaving ? 'Salvando...' : 'Salvar'}</button>
            </div>
          ) : (
            <button onClick={() => setIsEditMode(true)} className="flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"><PencilIcon className="h-5 w-5 mr-2" /> Editar</button>
          )}
        </header>

        <main className="bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg">
          {isEditMode ? (
            <>
              <label htmlFor="gdd-title" className="block text-sm font-medium text-gray-400 mb-1">Título do Projeto</label>
              <input id="gdd-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 bg-gray-800 border-2 border-gray-700 rounded-lg mb-6 text-2xl font-bold"/>
              <label htmlFor="gdd-content" className="block text-sm font-medium text-gray-400 mb-1">Conteúdo (Markdown)</label>
              <textarea id="gdd-content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-[70vh] p-3 bg-gray-800 border-2 border-gray-700 rounded-lg font-mono"/>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-6 border-b border-gray-700 pb-4">{title}</h1>
              <article className="prose prose-invert lg:prose-xl max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </article>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default GddDetailPage;
