// src/controllers/gddController.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { db } = require('../config/firebaseConfig');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Função auxiliar aprimorada para construir prompts detalhados
const buildPrompt = (idea, template, customPrompt) => {
    const instructions = `Aja como um game designer sênior e criativo. Responda APENAS com um objeto JSON válido, sem usar blocos de código (\`\`\`) ou a palavra "json". O conteúdo de cada campo deve ser detalhado, completo e inspirador.`;

    if (customPrompt && customPrompt.trim() !== '') {
        return `${customPrompt}. A ideia central do jogo é: "${idea}". ${instructions}`;
    }

    switch(template) {
        case 'rpg':
            return `Gere um Game Design Document detalhado para um jogo de RPG sobre "${idea}". ${instructions} O JSON deve ter as seguintes chaves e conteúdo:
            - "title": Um título épico e memorável para o jogo.
            - "highConcept": Um parágrafo único que resume a experiência do jogador, o mundo e o que torna este RPG único.
            - "storySynopsis": Um resumo da narrativa principal, incluindo o gancho inicial, os principais pontos de virada e o conflito central.
            - "worldBuilding": Uma descrição rica do cenário do jogo, sua história, principais facções e atmosfera.
            - "characterProgression": Descreva o sistema de níveis, habilidades, árvores de talentos e como o personagem do jogador se torna mais poderoso.
            - "combatSystem": Detalhe o sistema de combate. É por turnos, em tempo real, tático? Quais são as ações principais (ataque, defesa, magia, itens)?
            - "questSystem": Explique como as missões são estruturadas. Há missões principais e secundárias? Como são entregues ao jogador?
            - "visualStyle": Descreva a direção de arte. É realista, estilizado, pixel art, anime? Cite 2-3 jogos como referência visual.`;
        case 'strategy':
            return `Gere um Game Design Document detalhado para um jogo de Estratégia (RTS ou 4X) sobre "${idea}". ${instructions} O JSON deve ter as seguintes chaves e conteúdo:
            - "title": Um título forte e estratégico para o jogo.
            - "highConcept": Um parágrafo que define o conflito central, a escala do jogo e sua principal inovação no gênero de estratégia.
            - "gameObjective": Qual é o objetivo final para o jogador? Conquista total, objetivos de vitória, pontuação?
            - "factions": Descreva pelo menos duas facções jogáveis, destacando suas forças, fraquezas e unidades únicas.
            - "resourceManagement": Quais são os principais recursos do jogo (madeira, ouro, energia, etc.) e como os jogadores os coletam e gastam?
            - "techTree": Descreva a filosofia por trás da árvore de tecnologias. Ela foca em militarismo, economia, pesquisa? Dê exemplos de tecnologias chave.
            - "unitTypes": Detalhe algumas unidades centrais, como infantaria, veículos, unidades aéreas, etc., e seu papel no campo de batalha.
            - "winConditions": Liste as diferentes maneiras pelas quais um jogador pode vencer uma partida.`;
        default: // Template Padrão
            return `Gere um Game Design Document detalhado para um jogo digital sobre "${idea}". ${instructions} O JSON deve ter as seguintes chaves e conteúdo:
            - "title": Um nome criativo e cativante para o jogo.
            - "highConcept": Um parágrafo conciso que vende a ideia principal do jogo, seu gênero e seu diferencial.
            - "genre": O gênero principal e subgêneros (ex: "Plataforma 2D com elementos de puzzle").
            - "targetAudience": O público-alvo principal do jogo (ex: "Jogadores casuais que gostam de desafios de lógica").
            - "gameplayLoop": Descreva o ciclo de ações que o jogador repete. O que ele faz momento a momento? (ex: "Explorar -> Coletar moedas -> Desviar de inimigos -> Chegar ao final da fase").
            - "coreMechanics": Liste e descreva em detalhes pelo menos 3 mecânicas centrais que definem a jogabilidade.
            - "visualStyle": Descreva a direção de arte e a atmosfera visual. Cite 1-2 jogos como referência.
            - "soundDesign": Descreva o estilo da trilha sonora e dos efeitos sonoros para criar a imersão desejada.`;
    }
}

const generateGdd = async (req, res) => {
    const { idea, template, customPrompt } = req.body;
    const userId = req.user.uid;

    if (!idea || !userId) {
        return res.status(400).json({ message: 'Ideia e autenticação são obrigatórias.' });
    }
    
    const prompt = buildPrompt(idea, template, customPrompt);
    let responseText = '';
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        responseText = await result.response.text();
        const gddDataJson = JSON.parse(responseText);
        const newGddRef = db.collection('gdds').doc();
        const finalGddData = {
            id: newGddRef.id,
            userId: userId,
            template: (customPrompt ? 'custom' : template) || 'default',
            gdd: gddDataJson,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
        };

        await newGddRef.set(finalGddData);
        
        res.status(201).json({
            id: finalGddData.id,
            title: finalGddData.gdd.title || 'Novo Projeto',
            type: finalGddData.template,
            status: 'Rascunho',
            lastModified: finalGddData.lastModified,
        });
    } catch (error) {
        console.error("Erro Crítico em generateGdd:", error, "\nResposta da IA que pode ter causado o erro:", responseText);
        res.status(500).json({ message: "Erro no servidor ao processar o GDD. A IA pode ter retornado um formato inválido." });
    }
};

const listUserGdds = async (req, res) => {
    try {
        const snapshot = await db.collection('gdds').where('userId', '==', req.user.uid).orderBy('lastModified', 'desc').get();
        const gdds = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: data.id,
                title: data.gdd.title || 'Projeto sem título',
                type: data.template || 'default',
                status: 'Rascunho',
                lastModified: data.lastModified
            }
        });
        res.status(200).json(gdds);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar projetos." });
    }
};

const getGddById = async (req, res) => {
    try {
        const doc = await db.collection('gdds').doc(req.params.id).get();
        if (!doc.exists || doc.data().userId !== req.user.uid) {
            return res.status(403).json({ message: "Acesso negado ou projeto não encontrado." });
        }
        res.status(200).json(doc.data());
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar projeto por ID." });
    }
};

// ATENÇÃO: A função de update ainda não está habilitada na UI,
// mas já está preparada para receber um objeto GDD completo.
const updateGdd = async (req, res) => {
    const { gdd } = req.body;
    try {
        const gddRef = db.collection('gdds').doc(req.params.id);
        const doc = await gddRef.get();
        if (!doc.exists || doc.data().userId !== req.user.uid) {
            return res.status(403).json({ message: "Acesso negado." });
        }
        await gddRef.update({ 
            gdd: gdd,
            lastModified: new Date().toISOString() 
        });
        res.status(200).json({ message: "Projeto atualizado." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar projeto." });
    }
};

const deleteGdd = async (req, res) => {
    try {
        const gddRef = db.collection('gdds').doc(req.params.id);
        const doc = await gddRef.get();
        if (!doc.exists || doc.data().userId !== req.user.uid) {
            return res.status(403).json({ message: "Acesso negado ou projeto não encontrado." });
        }
        await gddRef.delete();
        res.status(200).json({ message: "Projeto deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar projeto." });
    }
};

module.exports = { generateGdd, listUserGdds, getGddById, updateGdd, deleteGdd };
