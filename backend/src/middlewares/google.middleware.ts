import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(process.env.GG_CLIENT_ID);

interface GoogleRequest extends Request {
  body: {
    token?: string;
    googleUser?: {
      email: string;
      name: string;
      avatar: string;
      sub: string;
    };
  };
}

class GoogleAuthMiddleware {
  verifyGoogleToken = async (
    req: GoogleRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.body.token;

      if (!token) {
        res.status(401).json({ message: "Access Denied - No token provided" });
        return;
      }

      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
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

        next();
      } catch (error) {
        console.error("Error verifying token with Google OAuth2Client:", error);
        res.status(401).json({ message: "Access Denied - Invalid Google token" });
      }
    } catch (error) {
      console.error("Error verifying Google token:", error);
      res.status(401).json({ message: "Access Denied - Error verifying token" });
    }
  };
}

export default new GoogleAuthMiddleware();