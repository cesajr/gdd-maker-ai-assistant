// src/controllers/gddController.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { db } = require('../config/firebaseConfig');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateGdd = async (req, res) => {
  const { idea } = req.body;
  const userId = req.user.uid;

  if (!idea) {
    return res.status(400).json({ message: 'A ideia para o jogo é obrigatória.' });
  }

  const gddTemplate = `
    Gere um Game Design Document (GDD) detalhado para um jogo baseado na seguinte ideia: "${idea}".
    Siga estritamente a estrutura abaixo, preenchendo cada seção de forma criativa e coesa.

    **1. Nome do Projeto:** (Sugira um nome criativo para o jogo)
    **2. High Concept:** (Descreva em um parágrafo as principais características do jogo. Máximo de 1000 caracteres)
    **3. Gameplay e Enredo:** (Descreva elementos de jogo, interação, fases, personagens, enredo e cenário.)
    **4. Fluxo do jogo:** (Descreva o fluxo textual, do menu principal ao fim de jogo.)
    **5. Level Design:** (Descreva a visão geral de uma fase de exemplo.)
    **6. Interface de usuário:** (Descreva a organização dos elementos visuais.)
    **7. Áudio, sound FX e música:** (Descreva as características de áudio e música.)
    **8. Concept Art e referências visuais:** (Descreva o estilo visual e referências.)
    **9. Mecânicas do jogo:** (Apresente de 3 a 5 mecânicas principais.)
    **10. Ideias adicionais e observações:** (Descreva funcionalidades extras.)
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(gddTemplate);
    const response = await result.response;
    const gddContent = await response.text();

    const newGddRef = db.collection('gdds').doc();
    
    let title = 'Novo Projeto de Jogo';
    try {
        const titleMatch = gddContent.match(/\*\*1\. Nome do Projeto:\*\*\s*([\s\S]*?)\s*\*\*2\. High Concept:\*\*/);
        if (titleMatch && titleMatch[1]) {
            title = titleMatch[1].trim();
        }
    } catch(e) { console.log("Não foi possível extrair o título.")}

    const gddData = {
      id: newGddRef.id,
      userId: userId,
      title: title,
      idea: idea,
      content: gddContent,
      status: 'Rascunho',
      type: 'Jogo Digital',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    await newGddRef.set(gddData);

    res.status(201).json(gddData);
  } catch (error) {
    console.error("Erro ao gerar GDD:", error);
    res.status(500).json({ message: "Ocorreu um erro no servidor ao tentar gerar o GDD." });
  }
};

const listUserGdds = async (req, res) => {
  const userId = req.user.uid;
  try {
    const gddsSnapshot = await db.collection('gdds').where('userId', '==', userId).orderBy('lastModified', 'desc').get();
    const gdds = gddsSnapshot.docs.map(doc => doc.data());
    res.status(200).json(gdds);
  } catch (error) {
    console.error("Erro ao listar GDDs:", error);
    res.status(500).json({ message: "Erro interno ao buscar projetos." });
  }
};

const deleteGdd = async (req, res) => {
  const userId = req.user.uid;
  const gddId = req.params.id;
  try {
    const gddRef = db.collection('gdds').doc(gddId);
    const doc = await gddRef.get();
    if (!doc.exists || doc.data().userId !== userId) {
      return res.status(403).json({ message: "Acesso proibido ou projeto não encontrado." });
    }
    await gddRef.delete();
    res.status(200).json({ message: "Projeto deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar GDD:", error);
    res.status(500).json({ message: "Erro interno ao deletar o projeto." });
  }
};

// --- NOVA FUNÇÃO PARA BUSCAR UM GDD ESPECÍFICO ---
const getGddById = async (req, res) => {
  const userId = req.user.uid;
  const gddId = req.params.id;
  try {
    const gddRef = db.collection('gdds').doc(gddId);
    const doc = await gddRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Projeto não encontrado." });
    }
    const gddData = doc.data();
    if (gddData.userId !== userId) {
      return res.status(403).json({ message: "Acesso negado." });
    }
    res.status(200).json(gddData);
  } catch (error) {
    console.error("Erro ao buscar GDD por ID:", error);
    res.status(500).json({ message: "Erro interno ao buscar o projeto." });
  }
};

// --- NOVA FUNÇÃO PARA ATUALIZAR UM GDD ---
const updateGdd = async (req, res) => {
  const userId = req.user.uid;
  const gddId = req.params.id;
  const { content, title } = req.body;
  if (!content || !title) {
      return res.status(400).json({ message: "Conteúdo e título são obrigatórios." });
  }
  try {
    const gddRef = db.collection('gdds').doc(gddId);
    const doc = await gddRef.get();
    if (!doc.exists) {
        return res.status(404).json({ message: "Projeto não encontrado." });
    }
    if (doc.data().userId !== userId) {
        return res.status(403).json({ message: "Acesso negado." });
    }
    await gddRef.update({
      content: content,
      title: title,
      lastModified: new Date().toISOString(),
    });
    res.status(200).json({ message: "Projeto atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar GDD:", error);
    res.status(500).json({ message: "Erro interno ao atualizar o projeto." });
  }
};

module.exports = {
  generateGdd,
  listUserGdds,
  deleteGdd,
  getGddById,
  updateGdd,
};
