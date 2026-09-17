import { Router } from "express";
import { AuthController } from "./auth.controller";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import { loginSchema } from "./auth.validation";

const authRoute = Router();

const authController = new AuthController();

authRoute.post('/login', ValidationMiddleware.validate(loginSchema), authController.login);
authRoute.post('/logout', authController.logout);

export default authRoute;