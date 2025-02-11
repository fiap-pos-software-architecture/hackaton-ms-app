import { Router } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../../../data-source";
import { AuthRepository } from "../repository/AuthRepository";
import { IAuthService } from "../../../../core/applications/ports/services/IAuthService";
import { AuthController } from "../controller/AuthController";
import { AuthService } from "../../../../core/applications/services/AuthService";

const authRepository = new AuthRepository(AppDataSource);
const authService: IAuthService = new AuthService(authRepository);
const authController = new AuthController(authService);

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const result = await authController.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/login", async (req, res) => {
  try {
    const result = await authController.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



export default router;