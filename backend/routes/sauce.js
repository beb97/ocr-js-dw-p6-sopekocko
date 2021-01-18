const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.get('/sauces/', sauceCtrl.getAll);
router.post('/sauces/', sauceCtrl.add);
router.get('/sauces/:id', sauceCtrl.getOne);
router.put('/sauces/:id', sauceCtrl.update);
router.delete('/sauces/:id', sauceCtrl.delete);
router.post('/sauces/:id/like', sauceCtrl.like);

module.exports = router;