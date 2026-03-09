import { SignJWT, jwtVerify, EncryptJWT, jwtDecrypt } from "jose";

const JWT_SECRET = Buffer.from(process.env.JWT_SECRET!, "hex");
const JWE_SECRET = Buffer.from(process.env.JWE_SECRET!, "hex");

const ISSUER = process.env.JWT_ISSUER as string;
const AUDIENCE = process.env.JWT_AUDIENCE as string;
const EXPIRY = process.env.JWT_EXPIRY as string;

export interface TokenPayload {
    id: string;
    email: string;
}

// Sign (JWS)
export const signToken = async (payload: TokenPayload): Promise<string> => {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer(ISSUER)
        .setAudience(AUDIENCE)
        .setExpirationTime(EXPIRY)
        .sign(JWT_SECRET);
};

// Encrypt (JWE)
export const encryptToken = async (payload: TokenPayload): Promise<string> => {
    return new EncryptJWT({ ...payload })
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .setIssuedAt()
        .setIssuer(ISSUER)
        .setAudience(AUDIENCE)
        .setExpirationTime(EXPIRY)
        .encrypt(JWE_SECRET);
};

// Verify (JWS)
export const verifyToken = async (token: string): Promise<TokenPayload> => {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
        issuer: ISSUER,
        audience: AUDIENCE,
    });
    return payload as unknown as TokenPayload;
};

// Decrypt (JWE)
export const decryptToken = async (token: string): Promise<TokenPayload> => {
    const { payload } = await jwtDecrypt(token, JWE_SECRET, {
        issuer: ISSUER,
        audience: AUDIENCE,
    });
    return payload as unknown as TokenPayload;
};