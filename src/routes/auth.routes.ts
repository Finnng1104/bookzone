import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import GoogleAuthMiddleware from "../middlewares/google.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.get("/checkemail", AuthController.checkEmail);
router.post("/checkemail", AuthController.checkEmail);

router.post("/login", AuthController.login);
router.post("/forgotpassword", AuthController.forgotpassword);
router.put("/changepassword", AuthController.changepassword);

router.post("/google-login", GoogleAuthMiddleware.verifyGoogleToken, AuthController.googleLogin);
router.get("/google/callback", AuthController.googleCallback);

router.post("/verifyotp", AuthController.verifyOtpEmail);
router.post("/logout", AuthController.logout);

export default router;