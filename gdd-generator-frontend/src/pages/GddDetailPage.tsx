// src/pages/GddDetailPage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeftIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Tipagem flexível para aceitar valores complexos da IA
type GddData = { [key: string]: any };

// Dicionário de tradução para os títulos das seções
const keyToTitleMap: { [key: string]: string } = {
  highConcept: "Conceito Principal (High Concept)",
  genre: "Gênero",
  targetAudience: "Público-Alvo",
  gameplayLoop: "Loop de Gameplay",
  coreMechanics: "Mecânicas Centrais",
  visualStyle: "Estilo Visual e Direção de Arte",
  soundDesign: "Design de Som e Trilha Sonora",
  storySynopsis: "Sinopse da História",
  worldBuilding: "Construção do Mundo (World Building)",
  characterProgression: "Progressão do Personagem",
  combatSystem: "Sistema de Combate",
  questSystem: "Sistema de Missões",
  gameObjective: "Objetivo do Jogo",
  factions: "Facções",
  resourceManagement: "Gerenciamento de Recursos",
  techTree: "Árvore de Tecnologias",
  unitTypes: "Tipos de Unidades",
  winConditions: "Condições de Vitória",
};

const GddDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gdd, setGdd] = useState<GddData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const gddContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/gdds/${id}`)
      .then(response => {
        setGdd(response.data.gdd);
      })
      .catch(err => console.error("Erro ao carregar projeto", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleExportPdf = () => {
    const contentToPrint = gddContentRef.current;
    if (!contentToPrint) return;
    setIsExporting(true);
    html2canvas(contentToPrint, {
      scale: 2,
      backgroundColor: '#111827',
      onclone: (doc) => {
        Array.from(doc.getElementsByTagName('*')).forEach(el => {
          if (el instanceof HTMLElement) el.style.color = '#D1D5DB';
        });
      }
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${gdd?.title?.replace(/ /g, '_') || 'gdd'}.pdf`);
      setIsExporting(false);
    });
  };

  const renderGddValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside pl-4 space-y-2">
          {value.map((item, index) => (
            <li key={index} className="text-gray-300">
              {typeof item === 'string' && item}
              {typeof item === 'object' && item !== null && (
                <>
                  <strong className="text-gray-100">{item.name || item.title || 'Item'}:</strong>
                  <span> {item.description || Object.values(item)[0]}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      );
    }
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="pl-4 border-l-2 border-gray-700">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="mb-2">
              <strong className="text-gray-100">{key}:</strong>
              <span className="text-gray-300"> {String(val)}</span>
            </div>
          ))}
        </div>
      );
    }
    return (
      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{String(value)}</p>
    );
  };

  const renderGddSection = (key: string, value: any) => {
    if (key === 'title') return null;
    const title = keyToTitleMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    return (
      <div key={key} className="mb-8 break-inside-avoid">
        <h2 className="text-2xl font-semibold text-teal-400 border-b border-gray-600 pb-2 mb-3">{title}</h2>
        {renderGddValue(value)}
      </div>
    );
  };

  if (loading) return <div className="text-center p-10 text-white">Carregando Projeto...</div>;
  if (!gdd) return <div className="text-center p-10 text-white">Projeto não encontrado.</div>;

  return (
    <div className="bg-gray-800 text-white min-h-screen p-4 sm:p-8">
      {/* --- O CABEÇALHO FOI RESTAURADO AQUI --- */}
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <Link to="/dashboard" className="flex items-center text-teal-400 hover:underline">
          <ArrowLeftIcon className="h-5 w-5 inline-block mr-2" />
          Voltar ao Dashboard
        </Link>
        <button onClick={handleExportPdf} disabled={isExporting} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg flex items-center disabled:bg-gray-500">
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          {isExporting ? 'Exportando...' : 'Exportar para PDF'}
        </button>
      </header>

      {/* --- O CONTEÚDO PRINCIPAL --- */}
      <div ref={gddContentRef} className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-white">{gdd.title || 'Projeto sem Título'}</h1>
        {Object.entries(gdd).map(([key, value]) => renderGddSection(key, value))}
      </div>
    </div>
  );
};

export default GddDetailPage;


