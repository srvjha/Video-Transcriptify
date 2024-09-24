import {Router} from "express"
import { videoTranscript } from "../controllers/transcript.controller.js"

const router  = Router();

router.route('/transcript').post(videoTranscript);

export default router