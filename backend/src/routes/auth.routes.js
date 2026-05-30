const { Router } = require('express')
const ctrl = require('../controllers/auth.controller')
const { authenticate } = require('../middleware/auth')
const { validate, authSchemas } = require('../middleware/validate')

const router = Router()

router.post('/register', validate(authSchemas.register), ctrl.register)
router.post('/login', validate(authSchemas.login), ctrl.login)
router.get('/me', authenticate, ctrl.getMe)

module.exports = router
