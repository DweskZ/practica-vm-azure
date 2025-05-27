import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
// Importa el factory user 
import { UserFactory } from "../models/factories/UserFactoy"; // añade esto


const userRepo = AppDataSource.getRepository(User);

import bcrypt from "bcrypt";

export const simpleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({
      message: "Login exitoso",
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

//Usamos el factory para crear un usuario

export const registerUser = async (req: Request, res: Response) => {
  const { email , password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    // 🔐 Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //const newUser = new User();
    //newUser.email = email;
    //newUser.password = hashedPassword;
    
    const newUser = UserFactory.create(email, hashedPassword); // ahora usando el factory



    await userRepo.save(newUser);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: { id: newUser.id, email: newUser.email } // No devuelvas la contraseña
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
};