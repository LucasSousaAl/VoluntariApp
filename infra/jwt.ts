// import jwt from 'jsonwebtoken'
import { SignJWT, jwtVerify } from 'jose'

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d';
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)


export async function generateToken(payload: object) {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(JWT_EXPIRATION)
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch {
    return null
  }
}