import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
  id: string;
  email?: string;
  isAdmin?: boolean;
}

export const generalAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN as string, {
    expiresIn: "365d",
  });
};

export const generalRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN as string, {
    expiresIn: "1d",
  });
};

export const refreshTokenJwtService = async (
  token: string
): Promise<{ status: string; message: string; access_token?: string }> => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
        if (err) {
          return reject({
            status: "ERROR",
            message: "Invalid or expired token. Please log in again.",
          });
        }

        const typedUser = user as JwtPayload;

        if (!typedUser?.id || typeof typedUser?.isAdmin === "undefined") {
          return reject({
            status: "ERROR",
            message: "Token payload is invalid.",
          });
        }

        const access_token = generalAccessToken({
          id: typedUser.id,
          isAdmin: typedUser.isAdmin,
        });

        return resolve({
          status: "OK",
          message: "Token refreshed successfully.",
          access_token,
        });
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "An error occurred while processing the token.",
      });
    }
  });
};
