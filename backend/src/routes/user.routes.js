import {Router} from "express"
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { giveNotes,downloadVideo } from "../controllers/transcript.controller.js"

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

//secured routes
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/get-current-user').get(verifyJWT,getCurrentUser)
router.route('/give-notes').post(giveNotes)
router.route('/download-video').get(downloadVideo)

export default router