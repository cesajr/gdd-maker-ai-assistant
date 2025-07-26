// src/middlewares/authMiddleware.js

const { auth } = require('../config/firebaseConfig');

const checkAuth = async (req, res, next) => {
  // 1. Verificar se o cabeçalho de autorização existe
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Não autorizado. Token não fornecido ou em formato inválido.' });
  }

  // 2. Extrair o token do cabeçalho "Bearer <token>"
  const idToken = authorizationHeader.split('Bearer ')[1];

  try {
    // 3. Verificar o token com o Firebase Admin
    const decodedToken = await auth.verifyIdToken(idToken);

    // 4. Se o token for válido, adicionamos as informações do usuário à requisição
    //    para que as próximas funções (os controladores) possam usá-las.
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    // 5. Chamar next() para passar a requisição para o próximo passo (o controlador da rota)
    next();
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    return res.status(403).json({ message: 'Acesso proibido. O token é inválido ou expirou.' });
  }
};

module.exports = checkAuth;
