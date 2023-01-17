const router = require('express').Router();
const Product = require('./model');
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const path = require('path');
const fs = require('fs');
const productController = require('./controller');

router.post('/product', upload.single('image'), async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path , target);
        try {
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`});
            res.send(result);
        }catch(e) {
            res.send(e);
        }
    }
});

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.post('/product/', upload.single('image'), productController.store);
router.put('/product/:id', upload.single('image'), productController.update);
router.delete('/product/:id', upload.single('image'), productController.destroy);

module.exports = router;