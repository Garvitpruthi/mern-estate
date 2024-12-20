import express from 'express'
import { signup, signin, google, signOut, verifyOtp, resendOTP } from '../controller/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOTP);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut);

export default router;