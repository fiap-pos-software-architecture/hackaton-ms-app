// src/core/services/AuthService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IAuthRepository } from "../ports/repository/IAuthRepository";
import { IAuthService } from "../ports/services/IAuthService";
import { IAuth } from "../../domain/Auth";

dotenv.config();

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor(productRepository: IAuthRepository) {
    this.authRepository = productRepository;
  }

  async register(authData: Partial<IAuth>) {
    const hashedPassword = bcrypt.hash(`${authData.password}`, 10);
    const user = this.authRepository.create({ email: `${authData.password}`, password: `${hashedPassword}`,  });
    return  await this.authRepository.save(await user);
  }

  async login(authData: Partial<IAuth>) {

    const user = await  this.authRepository.findOneBy({ email:  authData.email});

    if (!user || !(await bcrypt.compare(`${authData.password}`, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return { token, user };
  }

  public async create(authData: Partial<IAuth>): Promise<IAuth> {
    const upload = await this.authRepository.create(authData);
    return this.authRepository.save(upload);
  }
}
