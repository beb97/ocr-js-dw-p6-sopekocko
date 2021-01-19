const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');

const multer = require('../middleware/multer-config');



// router.get('/', sauceCtrl.getAll);
router.get('/', auth, sauceCtrl.getAll);
// router.post('/', sauceCtrl.add);
router.post('/', multer, sauceCtrl.add);
router.get('/:id', sauceCtrl.getOne);
router.put('/:id', sauceCtrl.update);
router.delete('/:id', sauceCtrl.delete);
router.post('/:id/like', sauceCtrl.like);

module.exports = router;