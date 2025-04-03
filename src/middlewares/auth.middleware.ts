import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

export const authAdminMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: "No token provided", status: "Error" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", status: "Error" });
    }

    req.user = decoded;

    // Check quyền admin
    if (typeof decoded === "object" && decoded.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied", status: "Error" });
    }
  });
};

export const authUserMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: "No token provided", status: "Error" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", status: "Error" });
    }

    req.user = decoded;
    next(); // Không cần kiểm tra isAdmin
  });
};