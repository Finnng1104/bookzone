import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(process.env.GG_CLIENT_ID);

export const authCombinedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenJWT = req.cookies.access_token || extractToken(req);
      if (tokenJWT) {
        jwt.verify(
          tokenJWT,
          process.env.ACCESS_TOKEN as string,
          (err: any, decoded: any) => {
            if (err) {
              res.status(401).json({ message: "Invalid JWT token" });
              return;
            }
            req.body.userId = decoded.id;
            next();
          }
        );
        return;
      }
  
      const tokenGoogle = req.body.token;
      if (tokenGoogle) {
        const ticket = await client.verifyIdToken({
          idToken: tokenGoogle,
          audience: process.env.GG_CLIENT_ID,
        });
  
        const payload = ticket.getPayload();
        if (!payload) {
          res.status(401).json({ message: "Invalid Google token payload" });
          return;
        }
  
        req.body.googleUser = {
          email: payload.email!,
          name: payload.name!,
          avatar: payload.picture!,
          sub: payload.sub!,
        };
        req.body.userId = payload.sub!;
  
        next();
        return;
      }
  
      res.status(401).json({ message: "Access Denied - No token provided" });
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Access Denied - Error verifying token" });
    }
  };

function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
}