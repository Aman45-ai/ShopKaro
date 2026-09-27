import { Router } from 'express'
import authControllers from '../controller/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
import authValidation from '../middleware/auth.validation.js'

const router = Router()

router.post('/register', authValidation.validateRegister, authControllers.signup)
router.post('/login', authValidation.validateLogin, authControllers.login)
router.post('/refresh-token', authControllers.newToken)
router.post('/logout', authMiddleware, authControllers.logout)
router.get('/me', authMiddleware, authControllers.me)

export default router