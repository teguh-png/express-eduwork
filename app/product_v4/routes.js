const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const productController = require('./controller');

router.post('/product', upload.single('image'), productController.store);
router.put('/product/:id', upload.single('image'), productController.update);
router.delete('/product/:id', productController.destroy);

router.get('/product/:id', productController.view);
router.get('/product', productController.index);

module.exports = router;
