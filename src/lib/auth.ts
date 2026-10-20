import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { UnauthorizedError } from "./errors";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "session";
const duration = (rememberMe: boolean): number => {
    return rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24 * 1
}

interface SessionPayload extends JWTPayload {
    adminId: string;
    isAdmin: boolean;
}

export const createSession = async (payload: SessionPayload, rememberMe: boolean) => {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${duration(rememberMe)}s`)
        .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: duration(rememberMe),
        path: "/"
    })
}

export const verifySession = async (token: string | undefined): Promise<SessionPayload | null> => {
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
        return payload as SessionPayload
    } catch {
        return null;
    }
}

export const getSession = async (): Promise<SessionPayload | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return verifySession(token)
}

export const destroySession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export const requireAdmin = async (): Promise<SessionPayload> => {
    const session = await getSession();
    if (!session?.isAdmin) {
        throw new UnauthorizedError()
    }

    return session
}