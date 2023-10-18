import {Router} from 'express'
import SignupController from '../../controllers/auth/SignupController.js'
import LoginController from '../../controllers/auth/LoginController.js'
import {SignupCheck} from '../../middlewares/SignupMiddleware.js'
import {LoginCheck} from '../../middlewares/LoginMiddleware.js'

const router = Router()

router.route('/signup/create').post(SignupCheck,SignupController)
router.route('/login/create').post(LoginCheck,LoginController)

export default router