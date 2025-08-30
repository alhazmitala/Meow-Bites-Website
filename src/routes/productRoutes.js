const express  = require('express');
const multer   = require('multer');
const path     = require('path');
const ctrl     = require('../controllers/productController');

const router = express.Router();

/* configure storage */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) =>
    cb(null, path.join(__dirname, '..', 'public', 'uploads', 'products')),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get('/',        ctrl.getAll);
router.get('/:id',     ctrl.getOne);
router.post('/',       upload.single('image'), ctrl.create);
router.put('/:id',     upload.single('image'), ctrl.update);
router.delete('/:id',  ctrl.remove);

module.exports = router;
