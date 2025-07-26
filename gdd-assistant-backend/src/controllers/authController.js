// src/controllers/authController.js
const { auth } = require('../config/firebaseConfig');

const registerUser = async (req, res) => {
  // Extraímos email, senha e nome do corpo da requisição
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    return res.status(400).json({ message: 'Email, senha e nome são obrigatórios.' });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // Retornamos apenas os dados essenciais e seguros para o cliente
    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    // Tratamento de erro comum do Firebase
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({ message: 'Este email já está em uso.' });
    }
    res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
  }
};

module.exports = {
  registerUser,
};
