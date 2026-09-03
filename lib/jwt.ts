// \lib\jwt.ts
import { SignJWT, jwtVerify } from "jose";

// نمایش خطای مناسب درصورتی که jwt_secret یافت نشود.
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not set.");
}

// اینکد کردم کلید jwt_secret
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/**تابع ساخت توکن */
export async function createToken(userId: number, email: string) {
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  return token;
}

/**تابع بررسی و خواندن توکن */
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  if(!payload){
    throw new Error("خطا در توکن");
  }
  return payload;
}
