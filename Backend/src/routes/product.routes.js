import { Router } from 'express'
import productController from '../controller/product.controller.js'
import validateProduct from '../middleware/product.validation.js'
import idValidation from '../middleware/id.validation.js'
import authMiddleware from '../middleware/auth.middleware.js'
import upload from '../middleware/upload.middleware.js'
import updateProductValidaton from '../middleware/updateProduct.validation.js'
import sellerAuthorisation from '../middleware/role.validation.js'
import ownerAuthorisation from '../middleware/owner.validation.js'

const productRouter = Router()

productRouter.get('/products',productController.getProducts)
productRouter.get('/products/:id',idValidation,productController.getSingleProduct)
productRouter.put('/products/:id',authMiddleware,sellerAuthorisation, idValidation, ownerAuthorisation,upload.single("image"),updateProductValidaton,productController.updateProduct)
productRouter.delete('/products/:id',authMiddleware,sellerAuthorisation,idValidation, ownerAuthorisation, productController.deleteProduct)
productRouter.post('/products',authMiddleware,sellerAuthorisation,upload.single("image"),validateProduct,productController.createProduct)
export default productRouter