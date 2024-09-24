import {Router} from "express"
import { videoTranscript,checkMe } from "../controllers/transcript.controller.js"

const router  = Router();

router.route('/transcript').post(videoTranscript);
router.route('/checkMe').get(checkMe)

export default router