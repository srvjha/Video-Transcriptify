import {Router} from "express"
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser,healthCare } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

//secured routes
router.route('/logout').post(verifyJWT,logoutUser)

router.route('/refresh-token').post(refreshAccessToken)
router.route('/get-current-user').get(verifyJWT,getCurrentUser)
router.route('/health-care').get(healthCare)

export default router