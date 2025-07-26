// src/routes/gddRoutes.js
const express = require('express');
const { 
  generateGdd, 
  listUserGdds, 
  deleteGdd, 
  getGddById, 
  updateGdd 
} = require('../controllers/gddController');
const checkAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', checkAuth, listUserGdds);
router.post('/generate', checkAuth, generateGdd);
router.get('/:id', checkAuth, getGddById);
router.put('/:id', checkAuth, updateGdd);
router.delete('/:id', checkAuth, deleteGdd);

module.exports = router;
