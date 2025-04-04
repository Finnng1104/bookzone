import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

interface CustomRequest extends Request {
  user?: jwt.JwtPayload | string;
}

export const authUserMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  // Kiểm tra token trong cookie thay vì header
  const token = req.cookies.access_token || extractToken(req); 

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN as string, (err: any, decoded: string | jwt.JwtPayload | undefined) => {
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
function extractToken(req: CustomRequest): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1]; // Lấy token sau Bearer
  }
  return null;
}

