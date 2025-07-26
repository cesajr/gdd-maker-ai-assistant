// src/config/firebaseConfig.js
const admin = require('firebase-admin');

// O require vai procurar o arquivo na raiz do projeto
const serviceAccount = require('../../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

// Exportamos para usar em qualquer lugar do nosso projeto
module.exports = { auth, db };
