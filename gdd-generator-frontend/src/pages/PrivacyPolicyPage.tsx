// src/pages/PrivacyPolicyPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-800 text-gray-300 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 sm:p-10 rounded-xl shadow-lg">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Política de Privacidade</h1>
            <p className="text-gray-400">Última atualização: 25 de julho de 2025</p>
        </div>
        <div className="prose prose-invert prose-lg max-w-none">
            <p>Sua privacidade é fundamental para nós. Esta Política de Privacidade explica como o GDD.AI Assistant coleta, usa e protege seus dados, em total conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/18).</p>

            <h2>1. Que Dados Coletamos?</h2>
            <ul>
                <li><strong>Dados de Identificação:</strong> Nome e endereço de e-mail fornecidos durante o login social (via Google, GitHub, etc.).</li>
                <li><strong>Dados de Uso da Plataforma:</strong> Informações sobre como você interage com nosso serviço, como funcionalidades utilizadas, logs de acesso, endereço IP, tipo de navegador e dispositivo.</li>
                <li><strong>Conteúdo Gerado pelo Usuário:</strong> As ideias, conceitos e textos que você insere para a criação dos seus Game Design Documents (GDDs).</li>
            </ul>

            <h2>2. Como e Por Que Usamos Seus Dados?</h2>
            <p>Tratamos seus dados com as seguintes finalidades e bases legais:</p>
            <ul>
                <li><strong>Para Executar o Contrato (Art. 7º, V, LGPD):</strong> Usamos seus dados de identificação e o conteúdo gerado para fornecer, manter e personalizar o serviço principal da plataforma.</li>
                <li><strong>Para Nosso Legítimo Interesse (Art. 7º, IX, LGPD):</strong> Utilizamos os dados de uso para melhorar a segurança, a funcionalidade e a experiência do usuário em nossa plataforma, sem processar dados pessoais sensíveis para tal.</li>
            </ul>
            <p><strong>Importante:</strong> Nós <strong>NÃO</strong> utilizamos seu conteúdo privado (suas ideias e GDDs) para treinar nossos modelos de inteligência artificial de forma global. Seu conteúdo é processado unicamente para gerar os resultados para a sua conta.</p>

            <h2>3. Com Quem Compartilhamos Seus Dados?</h2>
            <p>Não vendemos seus dados. O compartilhamento ocorre apenas com operadores essenciais para nosso funcionamento, como:</p>
            <ul>
                <li><strong>Provedores de Nuvem:</strong> Para hospedar a aplicação e armazenar os dados (ex: AWS, Google Cloud).</li>
                <li><strong>Provedores de Autenticação:</strong> Para gerenciar o login social (ex: Google, GitHub).</li>
            </ul>
            <p>Exigimos que todos os nossos parceiros sigam padrões de segurança e conformidade com a LGPD.</p>

            <h2>4. Seus Direitos como Titular dos Dados</h2>
            <p>A LGPD garante a você diversos direitos sobre seus dados, incluindo:</p>
            <ul>
                <li>Acessar, corrigir e atualizar seus dados.</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                <li>Revogar o consentimento a qualquer momento.</li>
                <li>Solicitar a portabilidade dos seus dados a outro fornecedor de serviço.</li>
            </ul>
            <p>Para exercer seus direitos, entre em contato conosco através do e-mail abaixo.</p>

            <h2>5. Segurança e Armazenamento</h2>
            <p>Adotamos medidas de segurança técnicas e administrativas para proteger seus dados, como criptografia e controle de acesso. Seus dados são armazenados enquanto sua conta estiver ativa ou pelo tempo necessário para cumprir as obrigações legais.</p>

            <h2>6. Contato (Encarregado de Proteção de Dados - DPO)</h2>
            <p>Para qualquer dúvida ou solicitação relacionada à sua privacidade e seus dados, entre em contato com nosso Encarregado de Proteção de Dados:</p>
            <p><strong>E-mail:</strong> privacidade@gddai-assistant.com (este é um e-mail de exemplo).</p>
        </div>
        <div className="mt-10 text-center">
            <Link to="/login" className="text-teal-400 hover:underline">&larr; Voltar para a página de Login</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;