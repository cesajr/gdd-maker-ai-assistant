// src/pages/HomePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircleIcon, PuzzlePieceIcon, DevicePhoneMobileIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import CookieConsentBanner from '../components/CookieConsentBanner'; // 1. Importe o componente

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-400">GDD.AI Assistant</h1>
        <nav>
          <a href="#features" className="px-4 hover:text-teal-400">Recursos</a>
          <a href="#how-it-works" className="px-4 hover:text-teal-400">Como Funciona</a>
          <Link to="/login" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Acessar
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-extrabold leading-tight mb-4">
          Do Conceito ao GDD em Minutos, com Inteligência Artificial
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Transforme suas ideias em um Game Design Document (GDD) completo e profissional. Perfeito para desenvolvedores de jogos digitais e analógicos.
        </p>
        <Link to="/dashboard" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 inline-flex items-center">
          <PlayCircleIcon className="h-6 w-6 mr-2" />
          Comece a Criar seu GDD Grátis
        </Link>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-gray-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-2">Tudo que Você Precisa para um GDD Perfeito</h3>
          <p className="text-gray-400 mb-12">Ferramentas inteligentes para acelerar seu processo criativo.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg">
              <DevicePhoneMobileIcon className="h-12 w-12 mx-auto mb-4 text-teal-400" />
              <h4 className="text-2xl font-bold mb-2">Para Jogos Digitais</h4>
              <p className="text-gray-400">Estruture mecânicas, level design, UI/UX e narrativas complexas com templates otimizados para jogos de PC, console e mobile.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg">
              <PuzzlePieceIcon className="h-12 w-12 mx-auto mb-4 text-teal-400" />
              <h4 className="text-2xl font-bold mb-2">Para Jogos Analógicos</h4>
              <p className="text-gray-400">Ideal para board games, card games e RPGs de mesa. Defina regras, componentes, balanceamento e a experiência do jogador.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg">
              <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-teal-400" />
              <h4 className="text-2xl font-bold mb-2">Exportação Flexível</h4>
              <p className="text-gray-400">Exporte seu GDD completo para PDF, Markdown ou integre com suas ferramentas de gerenciamento de projetos favoritas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Outras seções como "How It Works", "Testimonials", etc. podem continuar aqui... */}

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-4">Pronto para Tirar sua Ideia do Papel?</h3>
          <p className="text-gray-300 text-xl mb-8">Junte-se a milhares de desenvolvedores e comece a construir seu próximo jogo hoje.</p>
          <Link to="/dashboard" className="bg-white text-gray-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-200 transition duration-300">
            Criar meu GDD Agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GDD.AI Assistant. Todos os direitos reservados.</p>
          <div className="mt-4">
            <Link to="/termos" className="px-3 hover:text-teal-400">Termos de Serviço</Link>
            <Link to="/privacidade" className="px-3 hover:text-teal-400">Política de Privacidade</Link>
          </div>
        </div>
      </footer>

      {/* 2. Adicione o componente do banner aqui */}
      <CookieConsentBanner />
    </div>
  );
};

export default HomePage;
