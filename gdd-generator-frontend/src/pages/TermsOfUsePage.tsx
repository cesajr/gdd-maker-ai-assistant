// src/pages/TermsOfUsePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUsePage: React.FC = () => {
  return (
    <div className="bg-gray-800 text-gray-300 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 sm:p-10 rounded-xl shadow-lg">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Termos de Uso</h1>
            <p className="text-gray-400">Última atualização: 25 de julho de 2025</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
            <p>Bem-vindo ao GDD.AI Assistant! Ao utilizar nossa plataforma, você concorda com estes Termos de Uso. Leia-os com atenção.</p>

            <h2>1. Descrição do Serviço</h2>
            <p>O GDD.AI Assistant ("Plataforma") é um serviço online que utiliza inteligência artificial para auxiliar desenvolvedores de jogos na criação e estruturação de Game Design Documents (GDDs). A plataforma serve como uma ferramenta de produtividade, e o usuário é o único responsável pelo conteúdo final gerado e por sua utilização.</p>
            
            <h2>2. Propriedade Intelectual</h2>
            <p><strong>2.1. Da Plataforma:</strong> Todo o software, design, texto, imagens, e a marca GDD.AI Assistant são de nossa propriedade intelectual. Você não tem permissão para copiar, modificar ou distribuir nosso material sem autorização prévia.</p>
            <p><strong>2.2. Do Seu Conteúdo:</strong> Você retém todos os direitos de propriedade intelectual sobre as ideias, conceitos e todo o conteúdo que você insere na plataforma, bem como sobre os GDDs gerados ("Conteúdo do Usuário"). Nós não reivindicamos qualquer direito sobre o seu conteúdo. Apenas o utilizamos para fornecer o serviço a você.</p>

            <h2>3. Uso da Plataforma e Suas Responsabilidades</h2>
            <p>Ao usar a plataforma, você concorda em:</p>
            <ul>
                <li>Fornecer informações de registro verdadeiras e mantê-las atualizadas.</li>
                <li>Manter a segurança de sua conta e senha.</li>
                <li>Não utilizar a plataforma para fins ilegais ou não autorizados.</li>
                <li>Não inserir conteúdo que infrinja direitos autorais, marcas registradas ou a privacidade de terceiros.</li>
                <li>Não realizar engenharia reversa ou tentar extrair o código-fonte de nosso software.</li>
            </ul>

            <h2>4. Isenção de Garantias e Limitação de Responsabilidade</h2>
            <p>A plataforma é fornecida "no estado em que se encontra". A IA pode cometer erros ou gerar informações imprecisas. É sua responsabilidade revisar e validar todo o conteúdo gerado. Não nos responsabilizamos por quaisquer danos diretos ou indiretos resultantes do uso ou da incapacidade de usar nosso serviço.</p>

            <h2>5. Privacidade e Proteção de Dados</h2>
            <p>Nossa coleta e uso de informações pessoais estão descritos em nossa <Link to="/privacidade" className="text-teal-400 hover:underline">Política de Privacidade</Link>, que é parte integrante destes Termos e está em conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>

            <h2>6. Alterações nos Termos</h2>
            <p>Podemos modificar estes Termos a qualquer momento. Notificaremos você sobre alterações significativas através de e-mail ou por um aviso na plataforma. O uso continuado do serviço após as alterações constitui sua aceitação dos novos termos.</p>
            
            <h2>7. Legislação Aplicável</h2>
            <p>Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Fica eleito o foro da comarca de [Cidade/Estado da Empresa], Brasil, para dirimir quaisquer controvérsias.</p>

            <h2>8. Contato</h2>
            <p>Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail: <strong>contato@gddai-assistant.com</strong> (este é um e-mail de exemplo).</p>
        </div>
        <div className="mt-10 text-center">
            <Link to="/login" className="text-teal-400 hover:underline">&larr; Voltar para a página de Login</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;