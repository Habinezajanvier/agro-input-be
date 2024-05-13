import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

/**
 * encodeToken
 * @param payload
 * @returns
 */
export const encode = (payload: JwtPayload) => {
  const options: SignOptions = {
    expiresIn: "1d",
    algorithm: "HS256",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, options);
  return token;
};

/**
 * decodeToken
 * @param token
 * @returns
 */
export const decode = (token: string): JwtPayload => {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string);
  return payload as JwtPayload;
};
