const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');

const multer = require('../middleware/multer-config');



router.get('/', auth, sauceCtrl.getAll);
router.post('/', auth, multer, sauceCtrl.add);
router.get('/:id', auth, sauceCtrl.getOne);
router.put('/:id', auth, multer, sauceCtrl.update);
router.delete('/:id', auth, sauceCtrl.delete);
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router;