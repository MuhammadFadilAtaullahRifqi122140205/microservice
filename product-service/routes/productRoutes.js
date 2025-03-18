const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, productController.getAllProducts);
router.get('/me', authMiddleware, productController.getAllMyProducts);
router.get('/:productId', authMiddleware, productController.getProductById);
router.post('/create', authMiddleware, productController.createProduct);
router.patch(
  '/edit/:productId',
  authMiddleware,
  productController.updateProduct
);
router.delete(
  '/delete/:productId',
  authMiddleware,
  productController.deleteProduct
);

module.exports = router;
