import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface CustomRequest extends Request {
  user?: jwt.JwtPayload | string;
}

const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

export const authUserMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = extractToken(req);

  if (!token) {
     res.status(401).json({ message: "No token provided", status: "Error" });
  }

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token", status: "Error" });
      }

      req.user = decoded;
      next(); 
    });
  } else {
    res.status(401).json({ message: "No token provided", status: "Error" });
  }
};
