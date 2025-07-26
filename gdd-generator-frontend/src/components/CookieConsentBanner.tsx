// src/components/CookieConsentBanner.tsx

import React, { useState } from 'react';

const CookieConsentBanner: React.FC = () => {
  // O banner agora começa visível por padrão toda vez que o componente é carregado.
  const [isVisible, setIsVisible] = useState(true);

  // A verificação do localStorage no useEffect foi removida para que o banner
  // sempre apareça em um novo carregamento da página.

  const handleConsent = (consentType: 'all' | 'necessary') => {
    // Nós ainda salvamos a escolha no localStorage, pois essa informação é útil
    // para decidir se devemos carregar scripts de terceiros (como Google Analytics).
    localStorage.setItem('cookie_consent', consentType);
    
    // Apenas escondemos o banner da tela na sessão atual.
    setIsVisible(false);

    if (consentType === 'all') {
      console.log("Cookies de análise e marketing foram ativados para esta sessão.");
    }
  };

  // Se o banner não estiver visível (após o clique), não renderiza nada.
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-700 p-4 z-50 animate-fade-in-up">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 flex-grow">
          Nós utilizamos cookies para melhorar sua experiência em nossa plataforma. Alguns cookies são essenciais para o funcionamento do site, enquanto outros nos ajudam a analisar o tráfego e a personalizar o conteúdo. Saiba mais em nossa{' '}
          <a href="/privacidade" className="font-semibold text-teal-400 hover:underline">Política de Privacidade</a>.
        </p>
        <div className="flex-shrink-0 flex items-center gap-3">
          <button
            onClick={() => handleConsent('necessary')}
            className="font-semibold text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
          >
            Apenas necessários
          </button>
          <button
            onClick={() => handleConsent('all')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-5 py-2 rounded-lg transition-colors"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;